import { Request, Response } from 'express';
import Project, { IProject } from '../models/Project';

// @desc    Get all projects with optional filtering
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, roofType, dateFrom, dateTo } = req.query;
    let query: Record<string, any> = {};

    if (state) {
      query.projectState = state;
    }

    if (roofType) {
      query.roofType = roofType;
    }

    if (dateFrom) {
      query.projectDate = { ...query.projectDate, $gte: new Date(dateFrom as string) };
    }

    if (dateTo) {
      query.projectDate = { ...query.projectDate, $lte: new Date(dateTo as string) };
    }

    const projects = await Project.find(query).sort({ projectDate: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// @desc    Get project stats for dashboard
// @route   GET /api/projects/stats
// @access  Public
export const getProjectStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, roofType, dateFrom, dateTo } = req.query;
    let matchStage: Record<string, any> = {};

    if (state) {
      matchStage.projectState = state;
    }

    if (roofType) {
      matchStage.roofType = roofType;
    }

    if (dateFrom) {
      matchStage.projectDate = { ...matchStage.projectDate, $gte: new Date(dateFrom as string) };
    }

    if (dateTo) {
      matchStage.projectDate = { ...matchStage.projectDate, $lte: new Date(dateTo as string) };
    }

    // Get all projects that match the criteria
    const projects = await Project.find(matchStage);
    
    // Calculate aggregate stats
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.completed).length;
    
    const totalRoofSize = projects.reduce((sum, project) => sum + project.roofSize, 0);
    const averageRoofSize = totalProjects > 0 ? Math.round(totalRoofSize / totalProjects) : 0;
    
    const totalEnergySavings = projects.reduce((sum, project) => sum + project.energySavings, 0);
    const totalCostSavings = projects.reduce((sum, project) => sum + project.costSavings, 0);
    
    const totalTempReduction = projects.reduce((sum, project) => sum + project.temperatureReduction, 0);
    const averageTemperatureReduction = totalProjects > 0 
      ? Math.round((totalTempReduction / totalProjects) * 10) / 10 
      : 0;
    
    // Group by state
    const projectsByState = projects.reduce((acc, project) => {
      const state = project.projectState;
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Group by roof type
    const projectsByRoofType = projects.reduce((acc, project) => {
      const roofType = project.roofType;
      acc[roofType] = (acc[roofType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Group by month (for projects with installation dates)
    const projectsByMonth = projects
      .filter(project => project.installationDate)
      .reduce((acc, project) => {
        if (project.installationDate) {
          const date = new Date(project.installationDate);
          const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          acc[monthYear] = (acc[monthYear] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
    
    // Energy savings by roof type
    const energySavingsByRoofType = projects.reduce((acc, project) => {
      const roofType = project.roofType;
      acc[roofType] = (acc[roofType] || 0) + project.energySavings;
      return acc;
    }, {} as Record<string, number>);
    
    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        completedProjects,
        averageRoofSize,
        totalEnergySavings,
        totalCostSavings,
        averageTemperatureReduction,
        projectsByState,
        projectsByRoofType,
        projectsByMonth,
        energySavingsByRoofType
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};