import mongoose, {Schema} from "mongoose";

const BoardSchema = new Schema({
    name: { type: String, required: true},
    userId: { type: String, required: true, index: true },
    columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
}, {
    timestamps: true
}).pre(/^find/, function () {
    this.populate("columns");
});

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);