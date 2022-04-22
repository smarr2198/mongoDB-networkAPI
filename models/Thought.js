const { Schema, model } = require("mongoose");
const dateFormat = require("./../utils/dateFormat");
const reactionSchema = require("./Reaction");

// Schema to create a thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    // Users: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Users",
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
