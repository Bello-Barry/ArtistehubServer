import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schéma des commentaires
const commentSchema = new Schema(
  {
    commenterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'commenterModel',
    },
    commenterModel: {
      type: String,
      required: true,
      enum: ['Fan', 'Artiste'],
    },
    commenterPseudo: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    audioComment: {
      type: String, // URL du commentaire audio
    },
    timestamp: {
      type: Number,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

// Schéma des posts
const postSchema = new Schema(
  {
    posterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Artiste',
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    picture: {
      type: String,
    },
    audio: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
      enum: ['Pop', 'Rock', 'Jazz', 'Hip-Hop', 'Classical', 'Electronic','Rumba', 'Other'],
    },
    tags: {
      type: [String],
      default: [],
    },
    likers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    listens: 
      { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: [] 
      }
    , //ecouteur
    shares: 
      { 
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        default: [] 
      }
    , // partageurs
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    role: {
      type: String,
      required: true,
      enum: ['artiste', 'admin'],
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);