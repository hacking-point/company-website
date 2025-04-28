const mongoose = require("mongoose");
const cpuSpecificationSchema = new mongoose.Schema({
  cores: { type: Number },
  threads: { type: Number },
  baseClock: { type: String },
  turboBoost: { type: String },
  cache: { type: String },
  socket: { type: String },
  tdp: { type: Number },
  integratedGraphics: { type: String },
});
 
const gpuSpecificationSchema = new mongoose.Schema({
  memory: { type: String },
  cudaCores: { type: Number },
  boostClock: { type: String },
  ports: { type: [String] },
  powerRequirement: { type: Number },
});

const ramSpecificationSchema = new mongoose.Schema({
  capacity: { type: String },
  type: { type: String },
  speed: { type: String },
  voltage: { type: Number },
  casLatency: { type: Number },
});

const storageSpecificationSchema = new mongoose.Schema({
  capacity: { type: String },
  interface: { type: String },
  sequentialRead: { type: String },
  sequentialWrite: { type: String },
  formFactor: { type: String },
});

const motherboardSpecificationSchema = new mongoose.Schema({
  socket: String,
  chipset: String,
  formFactor: String,
  ramSlots: Number,
  maxRam: String,
  expansionSlots: Number,
  connectivity: [String],
});
const powerSupplySpecificationSchema = new mongoose.Schema({
  wattage: Number,
  certification: String,
  modular: { type: Boolean, default: false },
  fanSize: String,
  connectors: [String],
});
const caseSpecificationSchema = new mongoose.Schema({
  dimensions: String,
  material: String,
  driveBays: [String],
  coolingSupport: String,
  compatibility: String,
});
const monitorSpecificationSchema = new mongoose.Schema({
  size: String,
  resolution: String,
  refreshRate: String,
  panelType: String,
  connectivity: [String],
});
const peripheralSpecificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Keyboard", "Mouse", "Headset", "Others"],
    required: true,
  },
  features: {
    mechanical: { type: Boolean },
    dpi: { type: Number },
    refreshRate: { type: String },
    connectivity: { type: String },
    batteryLife: { type: String },
  },
});

const PeripheralSpecification = mongoose.model(
  "PeripheralSpecification",
  peripheralSpecificationSchema
);

const MonitorSpecification = mongoose.model(
  "MonitorSpecification",
  monitorSpecificationSchema
);

const CaseSpecification = mongoose.model(
  "CaseSpecification",
  caseSpecificationSchema
);

const PowerSupplySpecification = mongoose.model(
  "PowerSupplySpecification",
  powerSupplySpecificationSchema
);

const MotherboardSpecification = mongoose.model(
  "MotherboardSpecification",
  motherboardSpecificationSchema
);

const CpuSpecification = mongoose.model(
  "CpuSpecification",
  cpuSpecificationSchema
);
const GpuSpecification = mongoose.model(
  "GpuSpecification",
  gpuSpecificationSchema
);
const RamSpecification = mongoose.model(
  "RamSpecification",
  ramSpecificationSchema
);
const StorageSpecification = mongoose.model(
  "StorageSpecification",
  storageSpecificationSchema
);

module.exports = {
  PeripheralSpecification,
  MonitorSpecification,
  CaseSpecification,
  PowerSupplySpecification,
  MotherboardSpecification,

  CpuSpecification,
  GpuSpecification,
  RamSpecification,
  StorageSpecification,
};