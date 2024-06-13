import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponce';
import { CarService } from './car.service';
import mongoose from 'mongoose';

const createCar = catchAsync(async (req, res) => {
  const result = await CarService.createCarIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Car created successfully',
    data: result,
  });
});
const getAllCars = catchAsync(async (req, res) => {
  const result = await CarService.getAllCarIntoDB(req.query);

  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No data found',
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});
const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.getSingleCarIntoDB(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No data found',
      data: {},
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'A Car retrieved successfully',
    data: result,
  });
});
const updateSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CarService.updateCarIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});
const deleteCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarService.deleteCarFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});
const returnCar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await CarService.returnCarIntoDB(bookingId, endTime);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car booked successfully',
    data: result,
  });
});
export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateSingleCar,
  deleteCar,
  returnCar,
};
