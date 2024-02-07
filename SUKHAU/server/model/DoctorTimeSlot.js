const mongoose = require('mongoose');

const ScheduleDaySchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
});

const ScheduleDay = mongoose.model('ScheduleDay', ScheduleDaySchema);

const DoctorTimeSlotSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  day: { type: String, unique: true },
  timeSlot: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleDay' }],
  weekDay: String,
  maximumPatient: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const DoctorTimeSlot = mongoose.model('DoctorTimeSlot', DoctorTimeSlotSchema);

module.exports = DoctorTimeSlot;
