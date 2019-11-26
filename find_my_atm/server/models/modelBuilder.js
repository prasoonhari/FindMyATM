/**
 * Created by prasoon on 11/13/16.
 */
import mongoose from 'mongoose';

export function createSchema( schema, ...params ) {
  return new mongoose.Schema( schema, ...params );
}

export function createModel( name, schema, collection ) {
  mongoose.model( name, schema, collection );
  return mongoose.model( name );
}