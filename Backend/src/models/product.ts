import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; 

class Product extends Model {
  public id!: number;
  public productName!: string;
  public description!: string;
  public price!: number;

  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize, 
    tableName: 'products', 
  }
);

export default Product;
