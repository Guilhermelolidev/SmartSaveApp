import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  name: string;
  value: number;
  status: 'Ativo' | 'Pausado' | 'Cancelado';
  category: string;
  subscriptionPlan: string;
  imageUrl?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
    },
    value: {
      type: Number,
      required: [true, 'Valor é obrigatório'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['Ativo', 'Cancelado', 'Pausado'],
      default: 'Ativo',
    },
    category: {
      type: String,
      required: [true, 'Categoria é obrigatória'],
    },
    subscriptionPlan: {
      type: String,
      required: [true, 'Plano é obrigatório'],
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>('Subscription', subscriptionSchema);
