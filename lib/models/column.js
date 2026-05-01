import mongoose, {Schema } from "mongoose";

const ColumnSchema = new Schema({
    name: { type: String, required: true, trim: true },
    boardId: { type: Schema.Types.ObjectId, ref: "Board", required: true, index: true },
    order: { type: Number, required: true, default: 0 },
    jobApplications: [{ type: Schema.Types.ObjectId, ref: "JobApplication" }],
}, {
    timestamps: true
}).pre(/^find/, function () {
    this.populate("jobApplications");
});

export default mongoose.models.Column || mongoose.model("Column", ColumnSchema);