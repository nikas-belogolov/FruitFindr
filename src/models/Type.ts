import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IType {
    scientific_name?: String;
    wiki?: String;
    name: String;
    _id?: string;
}

const TypeSchema: Schema = new mongoose.Schema<IType>({
    scientific_name: {
        type: String,
        required: false
    },
    wiki: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    }
});

export default mongoose.models.Type || mongoose.model('Type', TypeSchema);