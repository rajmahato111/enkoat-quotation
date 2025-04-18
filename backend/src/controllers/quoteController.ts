import { Request, Response } from 'express';
import Quote, { IQuote } from '../models/Quote';

// @desc    Submit a new quote
// @route   POST /api/quotes
// @access  Public
export const submitQuote = async (req: Request, res: Response): Promise<void> => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error("Error saving quote:", error); // Log the error for debugging
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// @desc    Get all quotes with optional filtering
// @route   GET /api/quotes
// @access  Public
export const getQuotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { state, roofType } = req.query;
    let query: Record<string, any> = {};

    if (state) {
      query.projectState = state;
    }

    if (roofType) {
      query.roofType = roofType;
    }

    const quotes = await Quote.find(query).sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

// @desc    Get filter options (states, roof types)
// @route   GET /api/quotes/filter-options
// @access  Public
export const getFilterOptions = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Get distinct states
    const stateObjects = await Quote.aggregate([
      { $group: { _id: "$projectState" } },
      { $project: { code: "$_id", _id: 0 } },
      { $sort: { code: 1 } }
    ]);
    
    // Map state codes to state names (in a real app, this would come from a states collection)
    const stateMap: Record<string, string> = {
      'AZ': 'Arizona',
      'CA': 'California',
      'TX': 'Texas',
      'FL': 'Florida',
      'NV': 'Nevada',
      'NM': 'New Mexico',
      'CO': 'Colorado'
      // Add more as needed
    };
    
    const states = stateObjects.map(state => ({
      code: state.code,
      name: stateMap[state.code] || state.code
    }));
    
    // Get distinct roof types
    const roofTypes = await Quote.distinct('roofType');

    res.status(200).json({
      success: true,
      data: {
        states,
        roofTypes
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
};