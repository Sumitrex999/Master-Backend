import mongoose from "mongoose"

const medicalRecordSchema = mongoose.Schema({},{timestapms:true});

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);