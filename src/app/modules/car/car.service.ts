import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../errors/AppError';
import { carSearchableFields } from './car.const';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarIntoDB = async (query: Record<string, unknown>) => {
  const carQuery = new QueryBuilder(Car.find({ isDeleted: false }), query)
    .search(carSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await carQuery.modelQuery;
  return result;
};
const getSingleCarIntoDB = async (id: string) => {
  const result = await Car.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const deleteCarFromDB = async (id: string) => {
  const car = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!car) {
    throw new AppError(401, 'car not found');
  }
  return car;
};
export const CarService = {
  createCarIntoDB,
  getAllCarIntoDB,
  getSingleCarIntoDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
