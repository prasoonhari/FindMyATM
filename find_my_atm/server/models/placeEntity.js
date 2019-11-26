/**
 * Created by prasoon on 11/13/16.
 */
import {
  createSchema,
  createModel,
} from './modelBuilder';

export const ActionStatusSchema = createSchema( {
  actorId: String,
  type: {type: String, enum: ['StatusUpdate']},
  status: {type: Number, enum: [1, 0, 0.5]},//TODO
  time: Date,
} );

export const ACTION_STATUS_TYPES = {
  StatusUpdate: 'StatusUpdate',
};

const CommentSchema = createSchema( {
  userId: String,
  comment: String,
  time: Date,
} );

export default createModel( 'placeEntity', createSchema( {
  name: String,
  place_id: {type: String, unique: true, index: true, dropDups: true},
  types: {type: Array},
  location: {
    lng: Number,
    lat: Number,
  },
  opening_hours: {open_now: Boolean, weekday_text: []},
  actionStatus: [ActionStatusSchema],
  comments: [CommentSchema],
  vicinity: String,
} ), 'placeEntities' );