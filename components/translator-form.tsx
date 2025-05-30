"use client"

// Import react things
import type React from "react"
import { useState } from "react"

// Import shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

// Import own components
import { ThemeToggle } from "@/components/theme-toggle"
import { TranslatorResults } from "@/components/translator-results"

// Import translator related
import type { Translator } from "@/lib/types"
import { findBestTranslator } from "@/lib/translator-matcher"

// Import logos and badges
import { Globe, Clock, FileText, Award, ArrowRight, User} from "lucide-react"


// TranslatorForm Component
export default function TranslatorForm() {
  // Init formData
  const [formData, setFormData] = useState({
    sourceLanguage: "", 
    targetLanguage: "",
    pricePerHour: 14, 
    taskType: "",    
    manufacturer: "SunTech",
    manufacturerIndustry: "Tobacco",
    manufacturerSubindustry: "Tobacco",
    minQuality: 9,
    wildcard: "",
  })
  // Init supported languages
  const _sourceLanguages = ["Catalan", "English", "Spanish (Iberian)", "French", "German", "Spanish (Global)", "Dutch", "Italian", "Spanish (LA)", "Portuguese (Brazil)", "Galician", "Polish", "Portuguese (Iberian)", "Russian", "Norwegian", "Estonian", "Swedish", "Japanese", "Czech", "Danish", "Arabic", "Basque", "English (US)", "Spanish (Mexico)", "Chinese (Simplified)", "Slovak", "Portuguese (SOURCE)", "English (UK)", "French (Canadian)", "Korean", "Persian", "Greek", "Quechua", "Spanish (SOURCE)"].sort()
  const sourceLanguages = ["English", "French", "German", "Italian", "Catalan", "Spanish (Global)", "Spanish (Iberian)", "Spanish (LA)", "English (UK)", "English (US)", "Polish", "Galician", "Portuguese (Brazil)", "Portuguese (SOURCE)", "Danish", "Dutch", "Greek", "Swedish", "Korean", "Spanish (Mexico)", "Estonian", "Russian", "Basque", "Chinese (Simplified)", "Japanese", "Portuguese (Iberian)", "Spanish (SOURCE)", "Arabic", "Slovak", "Norwegian", "French (Canadian)", "Czech", "Quechua", "Persian"].sort()
  const _targetLanguages = ["Catalan", "Galician", "Spanish (Iberian)", "Portuguese (Brazil)", "Spanish (Global)", "English", "Basque", "Spanish (LA)", "French", "Portuguese (Iberian)", "German", "Italian", "Romanian", "Russian", "Chinese (Simplified)", "Dutch", "Arabic", "Valencian", "Polish", "Quechua", "Czech", "Swedish", "Danish", "Chinese(Traditional)", "Hungarian", "Turkish", "Korean", "Japanese", "Quiche", "Hebrew", "Norwegian", "Guaraní", "Croat", "Latvian", "Lithuanian", "Bulgarian", "Slovak", "Majorcan", "Flemish", "Scottish", "Greek", "Finnish", "Estonian", "Slovenian", "Spanish (Mexico)", "English (UK)", "Spanish (Argentina)", "Spanish (US)", "English (US)", "Qeqchi", "Portuguese (SOURCE)", "Aymara", "French (Canadian)", "Bahasa", "Ukrainian", "Kazakh", "Uzbek", "Indonesian", "Irish", "Maltese", "Asturian", "Fulah", "Mixteco", "Persian", "French (Switzerland)", "Urdu", "Azeri", "Spanish (Chile)"].sort()
  const targetLanguages = ["Spanish (Iberian)", "Catalan", "English", "Spanish (Global)", "Spanish (LA)", "Basque", "English (UK)", "English (US)", "Bulgarian", "French", "German", "Greek", "Hungarian", "Italian", "Japanese", "Korean", "Polish", "Russian", "Slovak", "Swedish", "Urdu", "Norwegian", "Portuguese (Iberian)", "Galician", "Valencian", "Portuguese (Brazil)", "Spanish (Mexico)", "Spanish (US)", "French (Canadian)", "Czech", "Danish", "Dutch", "Finnish", "Flemish", "Latvian", "Lithuanian", "Maltese", "Romanian", "French (Switzerland)", "Arabic", "Azeri", "Chinese (Simplified)", "Chinese(Traditional)", "Hebrew", "Indonesian", "Kazakh", "Persian", "Uzbek", "Spanish (Argentina)", "Quechua", "Quiche", "Guaraní", "Portuguese (SOURCE)", "Bahasa", "Spanish (Chile)", "Aymara", "Croat", "Slovenian", "Turkish", "Ukrainian", "Majorcan", "Estonian", "Fulah", "Qeqchi", "Scottish", "Irish", "Mixteco","Asturian"].sort()

  // Init supported fields
  const wildcards = ['Quality', 'Price', 'Deadline']

  // Init supported taskTypes
  const taskTypes = ["Miscellaneous","Engineering", "Management", "Translation", "ProofReading", "DTP","PostEditing", "TEST", "Spotcheck", "LanguageLead", "TranslationOnly", "Training", "ProofReadingOnly"].sort()

  const manufacturers = ["SunTech", "NexisOne", "HealthyLife", "Coastal Cottage", "AeroSysTech", "Zenith Tires & Engineering", "QuantumLogic", "ZenithSoft"].sort()// "Global Trading Solutions", "TruVision", "GenomicSolutions", "WaveMaster", "MotorForge", "SkyBridge Technologies", "DesarrolloYa", "CatalystIndustries", "TrueConnect", "FrontierTech", "SolutionSavvy", "Zenith Semiconductors", "Hyperion Industries", "Cogent Innovations", "Flux Fuel", "AlphaTech Industrial Services", "EcoSolar", "IndustrialGenius", "PureWater", "AeroIndustries", "RoboIndus", "HealthBridge Dynamics", "Nexus Software", "AllaHuAk", "PixelWave", "Equipronix", "NexiGen", "CyberTronics", "FabricatePro", "CommuniLink", "TechForge", "ElementalTech", "Moneylosing", "TechCity", "TelestoTech", "Modern Millworks", "ProgramaYa", "Synthet", "Global Logistics", "OmniTech", "Craton Machines", "IndustrialWave", "IndustrialInsight", "BioTechInnovate", "TechSignal", "AutoArtisan", "AutoBoost", "TechPlanner", "Vantage AutoTech", "Pinnacle Heavy Industries", "NexisTech", "NetSavvy", "TechDrive", "NovaSense Technologies", "Workplace Essentials", "ApexCare", "Skyward Technologies", "AeroMedical Devices", "TitanTainers", "Rigel Engineering", "ProPantry", "DynaIndustries", "Archstone Financial", "SignalWave", "IndustrialPulse", "IronCraft Solutions", "PinnaclePro", "InnoPlan", "PrecisionTools", "Quantum Processing Technologies", "Infinity Motors", "CarePro Technologies", "Liberty Home", "OffiPro Solutions", "InduLearn", "Swift Industrial", "ClearComm", "BlueGlobe", "PrimeStream Industrial Systems", "EliteWorks", "Apex Electric Equipment", "SolucionaYa", "FirstLine Solutions", "MedTech", "Precision Forge", "Ampere Industrial Works", "IronWorx", "Prodigy Machining", "Fusion Industries", "Copper Cask", "Innovate Industries", "ManuPro", "Sunnyside Manufacturing", "CyberIndustries", "FlowCycle", "ClearTrack Industries", "OmniDyne Dynamics", "DynaTech", "Sterling Railways", "EquipLife Innovations", "PrimaWorks", "Optima Industrial", "ConBuild", "Titan Heavy Industries", "DigitalHarbor", "EquipNet", "PrecisionTechSys", "GodFriend", "Askaden", "Frontier Resources", "Healthsphere", "StreamlineSys", "PowerGenius", "Automatek", "Modern Press Inc.", "OptiProbe", "ElectroForge", "MetaPro", "Mercury Rail", "MarvelParks", "Luminova", "SoftFactory", "AutoAlchemy", "MedPrime", "Machinify", "CodeNet", "RoboLogic", "NextPhase Engineering", "SonicBridge", "GridMach", "TerraForge Engineering", "Innovatia Solutions", "NovaStream Technologies", "RapidMach", "BTP", "OptimalChem", "TeleSoft", "Refresh Engineering", "PrimeLab Sciences", "Kinetic Systems", "HyperWave", "GreenPower Solutions", "NextGenIndustries", "Omega Industries", "Workforce Builders", "SoftNet", "LogiData", "SmartMed Innovations", "ByteBuilders", "FuturePharma Inc", "SmartForge", "Carbon Solutions Inc.", "DataTech Solutions", "IndustrialSoft", "Mediworks", "HealthSolutions Corp.", "MachineMind", "SensiProbe", "AeroFab", "VivaCore Technologies", "CommuniServe", "DriveDynasty", "Stasis", "Intellia Motors", "AgileMotive", "Protonics Engineering", "SkillForge", "ElectraTech Solutions", "NexCom", "ProcessTech", "Fusion Fabricators", "HealthLink Equipments", "ManuSoft", "SmartLab", "CareWise Innovations", "AutoMaven", "LakeShore", "Accura Systems", "NextGen Media Group", "MagnaTech", "MediLab", "Horizon Manufacturing", "Omni Consumer Products", "CarConnoisseur", "Constructive Co.", "ApplicaPro", "Polytech", "CatalystSoft", "Synergy Solutions", "CareForce", "OutsourcedNow", "TechSonic", "Vantage Chemicals", "Apex Innovations", "PowerForge Technologies", "Agronome", "PhysioNova", "TechStream", "VitalMed Equipments", "Precise Medical Supply", "Exergy Systems", "OptimalSystemics", "EonTech", "HealthBridge", "AssetShield Insurance", "CareEssential Innovations", "Inova Industrial", "OmegaTech", "Leman Bros", "NetWorx", "MediPlus", "EcoMed", "Element Engineering", "Optima Works", "Voltex Industries", "Synergic Chemicals", "FusionMark", "BigBolt", "Apex Industrial Rubber Company", "BioFabrica", "Penta Dynamics", "RadioTech", "MedLink", "AeroLand", "Arcturus", "FutureWorks Engineering", "Nexus Robotics", "HealthForge", "MedNova Instruments", "LifeCare Innovations", "VidaCore Biotech", "NexaPharm", "ProximaMed", "Workhorse Industries", "CareGenius Corp.", "BioSource", "Xiphos Semiconductors", "BondBridge", "IndustrialHorizon", "InfoCom", "InduNet Solutions", "CareShield Tech", "PetroWorks", "ProdigyTech", "AgroLogix", "FastTech", "NanoStream Industrial Solutions", "Neuron Industrial Solutions", "BluePixel Studios", "FutureTechInd", "Streamline Dynamics", "Metrix Industries", "Harbor Hill Investments", "FireSafe", "SynergySoft", "Indusonics", "EnergyWorks", "Horizon Trust Bank", "LujoMáximo", "Moria Real Estate LLC", "DigitalWorks Solutions", "InnovaciónNet", "Industronics", "Chemcorp", "Nova Navigations", "ProxiIT Consulting", "GigaPulse Technologies", "Vanguard Dynamics", "EcoZone", "EnviroSolutions", "ITLab", "PulsePower", "NetForge Infrastructure", "PowerDrive", "BrickStone", "Horizon Hardware", "AeroForge", "Nova Industrial", "TechTrak", "DreamMakers", "ElectraLogic Works", "TechFusion", "Matrix Motors", "Connectr Communications", "AquaFoam Solutions", "VisionaryTech", "CommuniTech", "Pioneer Real Estate Investments", "VitalBridge Solutions", "Tech-Ed", "ConstructoTruck Industries", "ModuPro", "PrecisionPro", "HealthNet", "Quantum Works", "DynoTech", "MetalCraft Co.", "ElectraMech", "Titan Construction", "MagnaFlow", "TechPulse", "PowerParks", "FusionWorks Industrial Solutions", "Agricultural Machinery", "Genus Industrial", "IndustrialNet", "Nexus Semiconductors", "ProducTech", "NexiSphere", "CycleCrafters", "FarmFusion", "Sentinel Defense", "SwiftTrack", "Acme Corporation", "GenomicWorks", "Spectra Dynamics", "PrintMaxx Solutions", "IndustrialNovation", "Vantage Point Telecom", "Imaginarium Works", "Techfront", "CoreTech Innovations", "Pulpco", "Phoenix Plastics", "Orbio Industrial", "AccuSense", "Evolve Robotics", "SkyConnect Enterprises", "SON", "Mechanicore", "Fortress Materials", "Apex Dynamics Semiconductors", "SmartEdge", "HydroGen Corporation", "MedLife Technologies", "BioClean", "Commlink", "Dynax Inc", "Peak Efficiency Industries", "IntellaTech", "AlphaZone", "Prime Industrial Group", "Electromech", "CyberMind", "ConnectEdge Innovations", "NextGen Industries", "IronMach", "SmartMed Diagnostics", "SaludTech", "InfraNetx", "Magma Manufacturing", "AeroNet", "InspireWorks", "EquipCare Solutions", "HealthWhoCare", "BioTech Manufacturing Group", "ClearVision AI", "PontifexZoo", "Elitech", "Infusion Dynamics", "Tranquil Textiles", "Citiworks", "Leisureland", "Hyperion Industrial Technologies", "TechEdge Industries", "CropTech", "GrandHarvest", "RedwoodWorks", "Healthy Spaces", "Jedi Council", "InnoVisionx", "InnoTech", "Elemental Electronics", "Tyrell Corporation", "CruiseTech Industries", "MaterTech", "FoodFlow", "MetroWorks", "SmartMfg", "MedCoke Supplies", "Productive Care", "SolarHaul", "OfficeWorks Industrials", "DataScope", "WorkforceWise", "Atomix", "EliteWorks Industries", "Aspirex", "DataNet", "CircuitLogic", "CurrentTech", "Industrisoft Consulting", "HealthBridge Innovations", "TitanWorks", "WorldLink", "Manufactura360", "ITone", "FactoMate", "Constructo", "Mecanix Corp.", "Chemplus", "QuickFix Builders", "CleanHands Logistics", "ApexMasters Industries", "DisfrutaYa", "Gateway Industries", "SoftConnect", "UniVerse", "SmartBridge", "IronCore Industries", "AgriPro", "SkyCare", "HealthLogic", "Industricom", "SkillWorks", "BioWave", "HiMedTech", "Meditech Industries", "AetherPharm", "ForgeFashion", "Teligentix", "CureEquip Co.", "Netwise Networks", "Vitality Health", "DuraStitch", "CareGear Innovations", "BioSupply Innovations", "OmniMedia", "SuperMovers", "BuildMate", "Gringotts Wizarding Bank", "EducaTrainning", "RoboForge", "BioSculpture Materials", "Vortex Manufacturing", "TechTactix", "MachineWorks", "EpicParks", "Circuitree", "CircuitDesign", "Fintrading Exchange Services", "PrimeMed", "HeritageBank", "GenoMachinex", "CarCrafter", "ZenithWorks Industrial Systems", "NewGen Industrials", "Thermopower", "Obladi Obalda", "CurrencyHub", "JoyfulBuilders", "Cognicom Industrial", "OmniCorp Manufacturing", "Summit Packaging Co.", "AquaPurify", "WebTech", "OmniBlend Manufacturing", "BioConic", "ApexPharma", "Starfleet Academy", "Bienestar360", "IndustrialWorks", "Invasion 1812", "MachineMasters", "Blackout Industries", "AquaVista Hotels & Infrastructure", "Medico", "Regalia", "VitalSign Innovations", "Outsourcify", "MediaStream Enterprises", "Skyline Technologies", "Industrial Distribution Co.", "InnoMold Engineering", "InsightTech", "NexaTech", "Zenith Materials", "Apex Automation", "Redwood Packaging", "Motora Industrial", "EquipWise Technologies", "Green Facilities Group", "SilkWorks", "Radiant Machineries", "Smart Sensors Inc", "Cyclonic Manufacturing", "Ministry of Magic", "CareGate", "Oasis Health", "HealthTech Innovations", "Umbrella Corporation", "ProxiMach", "AirPro", "Astra Aerospace", "HealthCore Solutions", "Marcus Bank", "WoodWorks", "Fusion Fabrications", "Solace Pharmaceuticals", "Visionary Press", "Industronix", "Novus Group", "Vantage Materials", "PowerGen", "Valtus Manufacturing Solutions", "InfraLink", "Mechpro", "IndustrialLink", "MedAssist", "Kinetic Utilities", "PowerLogic", "DeltaVision Engineering", "HealthAxis", "HealthQuest", "Legacy Asset Bank", "Cascade Industrial", "GreenWorks", "Steelwave Drilling", "HealthBridge Solutions", "Quantum Factory", "DynaMotive", "ByteNet", "FabricaYa", "Apex Industrial", "WebWorks", "CompraSmart", "MetalMinds", "TechMax", "Polymet", "HyperStream", "Summit Industrial", "Techspanic", "HarvestFields", "ChipTopia", "Chic Chateau", "El Ammo Bandito", "Protonik", "VerdiMed", "SecureData Services", "Precision Engineering", "Electric Vision Corp.", "Precision Industrials", "HealthSpace", "AdWorks Manufacturing", "ManufacturaDirecta", "EcoUtility", "LightWave", "West End Management", "RentLeas", "SecureIndustries", "InnoVision Consulting & Research", "Ultima Machineries", "Protektiv Industries", "SwiftWorks Inc.", "ComunicaciónDirecta", "LifeTech", "CloudWorks", "GAF", "CodeCrush", "AutoGenius", "IndustrialMed Supply", "ProxiCore Technologies", "FarmWorks Corp.", "TechSynth", "Futurize", "FutureScape", "AgroMotive", "Pacific Materials", "CleanHealth", "Onyx Machinery", "LifeEquip Solutions", "HarborWalk Industries & Resorts", "MindLink Consulting", "Human Builders", "TechFlow", "DigitalPro", "Luxe Linens", "IngenieríaWeb", "BioSynth Innovations", "FastTrack Construction", "Radiance Medical", "Vextonix", "LuxeBuild", "Healthify", "SilverStar Solutions", "Ventri", "FlightCrew", "TechMed", "HealthEquip Solutions", "OmniFabrication", "HealthCore Dynamics", "VitalityTech", "EcoEnergy", "ChicDesigns", "Symmetrix Systems", "Elite Medical Solutions", "Autozonix", "HealthEquip Innovations", "MeatWorks", "Industrial Equipment Co.", "ManuStream", "MedSpan", "Ironclad Industries", "Cyber Machinery", "SilverPeak Aviation", "RoadReady", "Diversión24", "Sistemas360", "Industrial Innovations", "PrecisionPerformance", "Quantum Dynamics", "AppGenius", "BioInnovate", "BioMatixx Materials", "OmniWorks", "SmartMech Industries", "FlexiTech", "IronBridge", "Metalite", "SmartFactorySolutions", "FactoryFuse", "DataHive", "PowerLift", "Assembyte", "Solar Steel", "SignalGen", "TruNorth IT Consulting", "DiversiFunds", "IndusXpert", "Gear & Grillhouse Restaurants Co.", "VitalEquip Inc.", "Meridian Industrial", "Swift Industrie", "Alliance Industrial", "NationalAusteryZiliInc", "CementWorks", "VitalTech", "OmniConglomerate", "AquaFlow", "IndustrialU", "FastCom", "Elite Electrics", "TrueNorth Aviation", "Zenith Engineering", "HealthMed Innovations", "PureLiving", "Accesstra", "Ranch Revival", "HealthMaster Inc.", "Polycraft", "Titan Textiles", "ConnectaBro", "InduTrac", "Capstone Management", "Pacific", "NextHorizon", "SkillTech", "AeroCargo Solutions", "PrograTech", "Titan Oil Services", "Zenith Environmental", "PixelCrafters", "PlantaPro", "Meditek", "SteelToe Footwear", "MightyMover", "Noble Oil & Gas", "Ergo Manufacturing", "Sparklight Media", "DigitalWorks", "UtilityPro", "LifeGuardian Equip", "Vehicore", "Techmax Industries", "SpeedZone", "Radiant Ventures", "Future Fabrications", "BuildWorks", "GastroMed Innovations", "Innovatech Manufacturing", "NexusWorks", "Dune Energy Corporation", "Autonix", "Fidelity Packaging", "Liberty Holdings", "BrightSight Engineering", "Impact Solutions", "VoltRider", "Novacore", "InfraTech", "Arcane Automation", "Axiom Industrial", "DynaFlow Solutions", "Machinatek", "MindSpark Media", "Industrial AirLift", "MindMeld Media", "InterActive Concepts", "Cyberdyne Systems Corporation", "PureFlow", "FutureTechSys", "PowerPulse", "Machine Mart", "StructuraTech", "Auralux Chemicals", "Applicon", "Press & Pantry Cafes Inc.", "Diverse Dynamics", "Voltage Ventures", "TechNexus", "NewWave Construction", "Buildrite", "EmergeTech Enterprises", "HealthCore", "InnoMed", "FutureX Enterprises", "Furnace & Flavor Foods Co.", "FlexControl", "Techspan", "Nexus Industrial Innovations", "GeneWorks", "MatLab", "Velocity Motors", "VitalMed Innovations", "Voltix Energy", "FusionLink Technologies", "LightLine", "EquipVantage Technologies", "BrightSol Chemicals", "TechTrend Advisors", "DriveCore", "RedLine", "ArcadiaTech", "CareSphere", "GearMaster", "SpeedyShip", "SoftVantage", "Arcadia Automation Systems", "Summit Resorts & Infrastructure", "Plastico", "Harvest Moon", "Softeach", "NextSoft", "echWorks Inc.", "Lifeguard Medical", "Proxit", "HealthWaves", "BrandBoosters Manufacturing", "MedClean Innovations", "Stratosphere Industries", "EquipHealth Solutions", "MachinEco", "IT360", "ClearWater", "OptiLogic", "HealthEquip Dynamics", "Industrial BioPharm", "AeroTech", "BestMarks", "SmartStream", "ElectriCo-Motors", "MegaForge", "BlueBloom", "Stellar Industrial Technologies", "NetBridge", "Serene Spaces", "Proton Engineering", "Omnimax Solutions", "Xcelerate Construction", "HemoLab Tech", "Stellar Holdings", "InnoTechInd", "Eagle Eye Industries", "ArteVida", "Precision Fabric", "ConStructPro", "Mainspring Industries", "CapitalForge", "GreenPak Industries", "Marvelous Machines Inc.", "Nova Autotech", "GlobalCom Connect", "BioScience Innovations", "SkyLift", "MotorMarvel", "Proline Industrial", "Medisphere", "SilverStone", "ConexiónGlobal", "VirtuFactory", "FinanceSwap", "CircuitWorks Corporation", "IndustraPak", "Intellisys", "TechEquip", "NexGen Innovations", "OnyxTech", "Intellifab", "EliteTech", "Agile Industrial", "Dynaforce", "Syncronix", "Fontaine Futuristics", "PowerWave", "QuantumWorksInd", "RegenTech Industries", "LifeEquip Dynamics", "Paradigm Manufacturing", "VertexTel", "SysTrack", "IntuitiveSys", "LifeGuard Equipments", "MedSupplies", "EnergySolutions", "OptiWorks", "BiotechWorks", "BlueSky Ad Agency", "Autoquipra", "Fizzy Works", "Meditech Devices Inc.", "JobsRUs", "FlexiSpace", "Titan Industrial Co.", "GraphixPro Printers", "CircuitPro", "Meditech Innovations Corp.", "EquipMart", "HomeClima", "Apex Connect", "LinkCore", "Healco", "HeavyTrux", "CureLink Innovations", "Industrial Movers Inc.Industrials & Moving Services", "SkyVision", "TalentWorks Industrial Solutions", "StreamlineTech", "StreamTech", "DeltaTech Manufacturing", "Edgecut Industries", "High Rollers Casino Co.", "Pure Steel Corporation", "Velocity Automotive", "MaxiBuild", "Orion Motors", "SaludConectada", "Magnacore Industrial", "InfraMorph", "BoldVentures", "AquaArena", "Maverick Industrial", "BioTechSolutions", "SwiftFlow", "Stronghold", "IndustriNation", "BioSolutions", "Arcadian Chemicals", "ClearNet", "Solaris Energy", "ControlEdge", "CallNet", "HealthVista Corp.", "MediSense", "ClearSpace Innovations", "AutoWorks", "Quantum Machinery Co.", "VitalSolutions Inc.", "Sterling Systems", "SkyHaul Industries", "CureCare Innovations", "ExperienciaTotal", "Electra Components & Systems", "NexTechx", "BrightBots", "MediServe Industries", "Inventa Machines", "Precision Industrial Labs", "Pacific Palisades", "NexTech Gaming Solutions", "HealthFlex", "InfoLink Communications", "OmniCorp", "Iron Gate Capital", "Innovar360", "IndustryPath", "SolucionaCom", "WellSpring", "Boho Bazaar", "BridgeTech", "NextGen", "PentaPublishing", "TitanForge", "Nexacore Chemicals", "FutureForge Industries", "BioTech Facilities", "IndusBank", "Horizon Investment & Banking", "Craftech Industries", "Southwest Sanctuary", "Environics Solutions", "SafeAccess", "Synthetix Systems", "Nextronics", "Artisan Abode", "HealthGuru", "HealthCore Innovations", "Polymetrix", "Baxtex Manufacturing", "IronForge", "IronHarvest", "OptiMach", "SmartPlay", "DeltaV Solutions", "TransCo", "Iconic Machineries", "Soylent Corporation", "Keystone Securities", "Perpetuum Machines", "Davenport Capital", "CleanTech Solutions", "Provenance Engineering", "SolidTech", "BioMotive", "PrintProIndus", "SparkStation", "Czerka Corporation", "VeloTech", "DynaFlow", "DataCrunch", "DerivativesX", "The Ad Machine Works", "Indauto", "NeoStream", "Avenir Dynamics", "Optimum Industries", "LifeWise Equipments", "AutoTech", "OceanWise", "ToolGenius", "Medilink", "Helix Motors", "Intellitronix", "Prodigy Consulting Group", "IndusMarkets", "DataBoost", "Powerhouse Equipment Co.", "NextGen Mechanics", "Atlas Foundry", "OvationTech", "IndustriConsulting Solutions", "RobotIQ", "IndustrialPro", "VoiceTech", "RoboWorks", "NanoLogic Systems", "SmartWorks", "BluNova", "GearWorks", "StrategyMind", "Synthetix Systems Inc.", "Viono Medical", "Telefabrix", "EquipLink Corp.", "CyberMech", "Enigma Semiconductors", "HealthLink", "CareLogistics Corporation", "TecnoMateriales", "Hitlermunger", "MedEquip Innovations", "BioSolutions Inc.", "NanoWorks Research Corp", "Hammer & Hearth Diners Co.", "EduManufacturing", "LifeWise Solutions", "MachinaMotive", "WorkSafe Industries", "Nantucket Nook", "Precision AirWorks", "SupplyStream", "MatPro", "JobReady Industries", "DataXcelerate", "Inovatek", "Vanguard Industrial", "PalmTree Resorts & Infrastructure", "Savory Delights", "CyberWise", "PrimeBuild Solutions", "EnviroGreen", "AppTech Solutions", "InnovaciónSoft", "Vintage Vibes", "Agrigenius", "EnergyPulse Inc.", "Nebula Aerospace", "Divergent Industries Bank", "Skyline Industrial", "NanoWorks", "SubaMachine", "Omnivance", "HealthPro Solutions", "SoCal Style", "ElectroEquipment", "Whitetips", "Advanced Manufacturing", "Safe Haven", "Cedar Creek Advisors", "Ultrasoundic", "HealthVibe", "Ionixx Engineering", "HealthEssential Inc.", "Core Equipment", "AdvancedHealthTech", "Byte Haven", "TechWave", "alentBridge Solutions", "Tetra Machines", "MindMeld", "IronMind", "SteelScape", "Sisi", "Poshmotlo", "CircuitMax", "ConnectCast", "MobiMotion", "SteelStride", "DigitalFuse Technologies", "Aerospace & Defense", "Code360", "Craftsmanship Academy", "SolucionaSoft", "Konichiwa", "Pixelwave Broadcasting", "TechCrest Manufacturing", "Surgical Science", "Phoenix Works", "HealthAid", "Silver Sands Gaming", "AeroLogix", "PixelVision", "EcoWorks", "SoilTech Fertilizers", "Willow Woodworks", "FertileGrowth Industries", "InfraNext", "Golden Nugget Gaming", "Vortex Innovations", "SkyTrust", "Vintage Reserve", "SensiTech", "AdMakers Industrial", "Respiro Dynamics", "PixelMind Studios", "Xenon Dynamics", "AetherWorks", "NovaTech Industries", "TechDental Innovations", "FamliFun", "Streamline Industries", "Vantage Systems", "PureEnergy Industries", "Factoría360", "PepeConsult", "NextPhase", "FutureForge", "BioBoost", "NetOpsWorks", "Hyperion Robotics", "ProgramaciónWeb", "GreenForce Innovations", "Intellimation Engineering", "VioHealth", "SignalServe", "CareCore", "ComuTech", "Windmill Industries", "Fusion Consulting", "EliteStream Industrial Automation", "EnviroChem", "TechnoGenius", "TestForge", "Intelliconnect", "BuildBotics", "Stealyourgirl", "PaperPro Packaging", "AeroGuard", "OutsourceLink", "Metro Real Estate Developments", "Sunbelt Real Estate Development", "Crimson Exploration", "Housing", "BlueLine Software", "NuMed Innovations", "Blackstone Drilling", "InfoIndustries", "AirFlow Dynamics", "FutureTech", "Cybersonix", "BrightWave", "Phoenix Industrial", "VoiceCom", "Atlas Assembly", "Ceramco", "EliteHealth", "BioGenX", "NexSonic", "Vitality Industries", "InfoStream", "Delphi Works", "NextGen Engineering", "PixelPerfect", "OutsourceEase", "InduTrain", "CareSquad", "TechSwift", "NovoWorks", "OmniMech Industries", "OptiTest", "DataForge", "HealthGuard Inc.", "Momentum Industrial Corp", "Streamline Industrial Trust", "Pacifyl", "Appcelerate", "CineMachining", "SwiftCore", "SynthoChem", "TechLink", "ArtifexZoo", "TravelsCo", "HealthGenius Innovations", "MedLab", "Medimotive", "BioPro Manufacturing", "AeroMetrix Industries", "HealthVantage Corp.", "NetComm", "Nouveau Nesting", "FSB ", "Novapex", "GardenHues", "EquipMed Inc.", "SurgiScope", "AgroTech Industries", "Atlas Industrial and Development Corporation", "HealthGuardian Technologies", "Paperworks Inc.", "BioTechPlus", "Timberlandia", "MedCrest", "DigitalForge Technologies", "VitalLife Corp.", "Infinity Dynamics", "SteriMed", "Spark Systems", "Legacy Industrial and Development Group", "BuildForge", "FabriTech", "Velocity Industrial", "HealthNet Distributors", "ArtiCraft", "HealthTech Dynamics", "NetCrafts", "DataRealm", "Metaland", "AccuTech", "InspectWorks", "InnoVitality", "WaterCorp", "CareGenius Technologies", "OptiTech", "ProCall", "ProdWorks", "Vaxicore", "HealthGuard Solutions", "MachineMind Innovations", "VortexTech", "IndustrialIQ", "NextWave", "Zenith Dynamics", "Aerodyne Tech", "Conveyor & Cookery Manufacturing Co.", "OrthoTech Solutions", "BlueBolt", "DynaSource", "Quantum Quality Control", "IndusComm", "Nature\'s Choice", "Lighthouse Materials", "GenoMed", "Global Logistics Solutions", "TecnoIndustria", "Bionix Corporation", "IndustraFarm", "Palm Springs Pad", "HealthEdge", "ZipCom", "CallMax", "Inkwell Printing Solutions", "EcoPackaging Solutions", "EverCare", "DriveLine Motors", "ApexPrint Corp.", "BioMatrix Materials", "DigitalPulse", "VitalTrack", "SystemWorks Consulting", "TerraWorks", "Direct Supply", "WindStar Energy", "PureLife", "PrimalTek", "VitaEquip Innovations", "ElementaCo", "EdgePath", "Metro Machinery", "CureLab", "Precision Packaging", "Industrial Jetstream", "Greener Homes", "NuLife Medical", "Prodigy Manufacturing", "HealthPro", "Apex Enterprises Group", "Helix Industrial Automation", "GlassGuard", "Cemtex", "OutsourceConnect", "WorkLearn", "Velocity Industries", "IngeniaNet", "Circuitry Solutions", "Havenly Homes", "IndustryEd", "MedicaSoft", "SylphCo", "CareBay", "SkyNet", "TechShore", "FusionPoint Innovations", "SaludTotal", "Zenith Aerospace", "GlobalTech Solutions", "AeroMed Industries", "CareView", "Industrial Innovators", "AirMasters", "FastTrack Industries", "OutsourceMate", "Web360", "SigmaTech", "Apex Cybernetics", "TechOutsourced", "RefineChem", "Grandeur Co", "Solartek Industrial", "Apextronics", "SolMat", "RedRock Solutions", "Coastal Industries & Cruise Line", "FarmFresh", "IndusDiver", "alent Builders Inc.", "SystemicIndustries", "WheelsHub", "VisionComm", "Industrisecure", "EleguitarEq", "MachinoTech", "Industrialtech", "AutoPlanner", "Swiftstream Media", "Goldstinc", "ForceMaster", "Clearview Investments", "Synergy Works", "Tech Works", "HealthEssential Innovations", "OptimaWorks", "Synergen Robotics", "InfraLogic", "ServiCom", "Luminary Works", "ReliaSure Insurance", "Infinium Works", "Screw & Saucer Cafes Ltd.", "BuildMaster", "FactoFlow", "TechGen", "CommuniPro", "HealthMaxx Solutions", "LifeShield Dynamics", "OutsourcedTech", "AquaLux", "EquipMaxx Dynamics", "WebPro", "Heritage Home Goods", "FutureWorks", "IndustrialGenius Consulting", "Thunderbolt Defense", "IronTech", "MachineHorizon", "GraphiPrint Solutions", "Innovex", "CyberWorks Solutions", "VirtualCom", "Xylium Robotics", "Stellar Manufacturing", "Vital Solutions", "PixelForge", "Gearhead Innovations", "BuildEquip", "EcoMetrix", "SafeMed", "Industrial Steel Inc.", "Zenith Industrial", "Agri-Tech", "Swiftstream", "VitaEquip Solutions", "Echelon Tire Corporation", "Desert Digs", "InfraForge", "FluidTech", "OpenBook", "IndustrialMedics", "CodeCraft", "CleanCharge Inc", "HydroWorks", "MedPro", "HealthShield Corp.", "Arcadian Electric", "HappyCampers", "PurePulse", "FluidMaster", "Cybros", "SoftEcology", "Vanguard Manufacturing", "IndusLab", "Veritas Operations", "Keystone Distributors", "MachinMind", "MedNexus", "IndustryIQ", "CodeWorks", "Securitech Solutions", "EquipmentExchange", "CygnusIndustries", "Precision Welding Solutions", "AccuPulse", "Matrix Dynamics", "MedEquip", "AeroPulse Solutions", "ProdigySoft", "Cybrospection", "HealthWorks", "Bolt & Bite Restaurants Inc.", "TechNova Consult", "SafetyTech Systems", "Skytech Industries", "Hogwarts School of Witchcraft and Wizardry", "Kalampur", "ProcessRaven", "MotoMech Solutions", "Nexion Industrial", "DataDriven Dynamics", "Techno Genesis", "NextGen Systems", "Liathium", "Axiom Applications", "PolymerSolutions", "SilverPeak Enterprises", "HealthWise Industries", "Summit Securities Group", "KineticWorks", "Industritronix", "Hogsmeade Realty Corporation", "HarvestMax Chemicals", "Apex Capital Partners", "The Solution Factory", "Jolt Construction", "Intellindustries", "Foundry & Food Truck Corp.", "Heavyguard", "Vizipro", "Skyline Robotics", "Innovatek", "Medimatrix", "SparkLabs", "Crystal Resorts & Infrastructure", "CloudNation", "Envoque", "Pyxis Semiconductors", "Liliputingi Supplies", "NeuroDevice", "ChemiSpec", "BelleMode", "InduTech", "GreenNet", "AeroChem", "Starlight Solutions", "ManufacTrust", "Bold Ventures", "MechSignal", "Elite Machining Corp", "BioMechTech", "BrandWave Marketing", "AquaZone", "Sterling Industrial", "Mat360", "MaterialExchange", "Harborfront Technologies", "SmartBuild", "SysTech", "HeavyHaul", "Silvus Machines", "Urban Clean", "VitaLife Solutions", "BayShore", "SynapseSphere", "IgniteTech", "NovaTel Communications", "AssetMind", "MedCorp", "FlowTech", "DataFusion", "Apex Automotive Systems", "SwiftWorks", "ProducciónDigital", "AccuVision", "Aurora Aerospace", "CuraOnline", "Vantage Media", "AssemTech", "Rhapsody Systems", "ProBuildTech", "Constructa", "Innovatech", "Synthetix Analytics", "Jedi Temple Academy", "ZenBridge", "CreativWorks", "Coastline", "EcoCycle Inc.", "PrecisionIndustries", "PureSolutions Health", "Synthetix", "AdeptTech", "SpinMark", "VitalForce", "CloudNet", "Hambalah", "TestMate", "ElectraTrans", "AutomateQ", "Axion Automotive Solutions", "Vivi", "Trivea Resorts", "PureFlow Distributors", "Vitaline Solutions", "Producx", "Lucky Ace Gaming", "SupplyBridge", "Infinity Industrial Products", "HarvestHive", "Gateway Industrial Properties", "Synaptic Technologies", "Stone Ridge", "SkyWorks Industrial Solutions", "LifeCycle Industries", "InfraMation", "Nexus Medical Innovations", "HealthVantage Innovations", "Endeavor Group", "Ironshield", "GreenTech Industries", "OceanFront Cruise Line", "Oakwood Real Estate Development", "RubberWorks", "Grill & Gasket Inc.", "CarbonForge", "Operatec", "Industrial Bliss", "VitalGear Corp.", "WorkFlowX", "ElectriCore Innovations", "Infinite Innovations", "DreamWorks Solutions", "Skyline Industrial Investments", "MedClean", "VioTech", "Quantum Industries", "Prodigy Industries", "Horizon Engineering", "BioCare", "Quantum Logistics", "CareLink", "SolucionesSoft", "FineLine", "Maximus Machines", "Healty Wealty Company", "Philanthropic Industrial Group", "PrecisionCast", "IndustraMed", "VioleX", "DataWorks", "Vanguard", "HarborSide Industries & Resorts", "VeloTrak", "FleetBuilders", "Landmark Industries", "Apex Global", "NanoScale Scientific", "PasatiempoPro", "SecurePro Industries", "Homestead Construction", "IndustrialVision", "Prodigy Auto Parts", "DigitalPrint Innovations", "TechWise Manufacturing", "AlphaWorks", "TecnologíaDigital", "Pharmalogic", "Intelliplast", "AeroAdventures", "ProcesoLab", "VitalWorks Inc.", "LuxeWear", "VitalCore Technologies", "ApexTech", "Agroquip", "SustainAll", "IndusLegal Solutions", "Horizon Industries", "Skyline Industrial Products", "AutoMakers", "InfraScope", "SecurePath Insurance", "ArtEvo", "CareMaxx Dynamics", "SoftTech", "Acrylon", "Northern Paper Products", "MedEdge", "Paradigm Industrial Products", "HealthEquip Technologies", "GlobeGuardian", "RenewaTech", "MatLabNet", "Digital Dreamers", "Quantumtron", "ProxiForge", "VitaGear Innovations", "Oak & Vine", "IndustroEnergy", "FutureBuild", "IndustriaTotal", "InnoIndustries", "HealthScope", "Kinematica", "Assembly Avenue", "RRHH", "SwiftTech", "IndusInno", "FarmElevate", "Omni Electric Products", "Prime Distribution", "DreamBuilders", "BioSphere", "Altitude Solutions", "SignalTech", "FutureFlow", "Industrial Dynamics", "Buildware", "DigitalCrest", "AgileTech", "InfraSolve", "CapitalBridge Inc.", "Radiant Telecom", "Silicon Dynamics Inc.", "ProdTech Services", "Atlas Corporation", "Hands-On Industries", "Meditron", "Titan Works", "Harmonious", "BioLogic", "PrecisionPrint Solutions", "MedHero", "PrimeMach", "SmartSolutions Consulting", "MediStream", "Nuvio Machines", "ProxiMed Devices", "Waveform Wireless", "Eclipse Industries", "MetalBourse", "Spectrum Publishing", "TerraGrow Industries", "Mill & Meal Foods Ltd.", "BitBridge", "NextGenius", "VersaElectronics", "Omega Robotics", "NexusMind", "EquipCare Innovations", "FutureScope Engineering", "Elite Biomedical Solutions", "TriAxis Manufacturing", "Engineware", "Infracon", "NextGen Advertising", "SwiftCom", "FunFlicks", "MyriadMedia", "Chemwell", "Stellar Aeronautics", "Aethos Dynamics", "BioAgra", "Meridian Machinery Group", "QuantumIndustries", "NextLevel Industrials", "QuantumPrint Solutions", "IndustriEx", "Industrial Connect", "OrbiChem Corporation", "Cloudware", "Skyline Industries & Cruise Line", "Gravitas Engineering", "Voxite Industries", "WaveTech", "SolidStep Footwear", "IndustrialWorx", "Apex Assembly", "NetGuard", "RespTech Solutions", "LogicForge", "HighPress", "OmnitechInd", "Lumina Tech", "DynaWorks", "Quantum Quartz", "LinkCom", "RefinePro", "FlightWorx Industries", "Voltex Industrial", "RoboCare Solutions", "UnionStream Corporation", "ProTech Shoes", "EliteSoft", "MedWise Innovations", "AquaAir", "Put In Pieces", "Council of Elrond", "Titan Industrial", "Vistasol Chemicals", "Exceltech", "ToolTopia", "NewEdge", "RubberTech Industrials", "ConexiónTotal", "Machinetronix", "Powerlynx", "Convergent Materials Corp.", "BlueStar Industrial", "CineCorp Industries", "Nexindus", "Vanguard Industrial Properties", "Helix Holdings", "FutureStep", "Tobacotri", "Skyline Automation", "IndusTech", "Starlight Advertising", "VoltGen", "Traxxon Solutions", "TechSurgeon", "TranscomNet", "State of Mordor Goverment", "WebWelding", "ProTechOne", "BayView Industries & Cruise Line", "TecnologíaIndustrial", "TecnologíaTotal", "Securitech Industrials", "SteelCo", "MechanoWorks", "Intellitalk", "Clickforce", "IndusVision", "Manufactron", "Department of Mysteries", "AdvancedEndo", "NanoMed", "GrowGenius", "HomeShield Builders", "AeroLeisure", "NorthStar Manufacturing", "Mechanixus", "GlamorCorp", "GlobeLink", "Epoch Energy Solutions", "Bubblesque Beverages", "ProTech Dynamics", "TerraNet Industrial Systems", "DataStream", "IndustrialFirst National Bank", "AppTronics", "IronCore Manufacturing", "SwiftSoft", "SystemSource", "Agro-Motion", "Meditronix", "LifeLab", "Lubritech", "BlueShift Robotics", "Thomaslight", "FlexiPak", "VitalPulse Solutions", "NexTech", "Synapse Integration", "The Industrial School", "MatInnova", "AquaPure Systems", "SmartMed Equipments", "TerraTech", "Mechaworks", "Industrial Innovate", "AlgoSys", "DataVibe", "ClearWater Environmental", "HR Dynamics", "IronBeast", "Constructivus", "SteelHawk", "ShiftWorks Engineering", "Autovance", "Summit Real Estate Holdings", "MedTech Dynamics", "Alpha Industrial Solutions", "Machinex", "VidaSalud", "Streamline", "Crestwood Dynamics", "GreenPath", "ITech", "PharmaLogistics", "Obsidian Drilling", "EliteForge Co.", "Rustic Retreats", "InnovateX", "IndusPartners", "HealthScan Innovations", "OilFusion", "Apex Consulting", "Apex Specialty Properties", "Coruscant Senate", "Pacific Industrial and Development Corporation", "Rapid Renovations", "TotalSupport Solutions", "EquipPro Inc.", "NetworkWave Inc.", "HealthPulse", "Royal Flush Gaming", "PowerCrane", "IndustriBank", "CleanWash Co.", "Precision Dynamics", "Skyway Manufacturing Co.", "BrightWorks", "VeritasVenture", "BlueCollar University", "SteelStream", "IndustriFin", "CodeLine", "AccuBank Industries", "Efficient Assembly Inc", "Holonet", "ElectraWorks", "Wayne Enterprises Real Estate Division", "Metaverso", "Winning Streak Casinos", "TechFab", "SafeHarbor Insurance", "Summit Banking & Industries", "Empyrean Dynamics", "ProEquip Co.", "InnoTech Solutions", "ModernPack", "SunWorks", "AquaTech", "Netvox", "Velocity Communications", "Skybridge Logistics", "Titan Engineering", "BuildPro", "AeroTech Services", "Caretronics", "MedPro Equipments", "BlackRock Railways", "Gourmet Goodness", "Axiom Services", "SteelTech", "NovoForge", "Fortune Falls Casinos", "FutureTech Solutions", "OptimumTech", "ProcessPro", "InnoSoft", "Packwise Solutions", "MetalMind", "Horizon Hotels & Infrastructure", "ProPak Industries", "ResearchWorks Inc.", "Pacific Packaging Co.", "Zenith Industrial Solutions", "Metalcon", "Peak Industrial Resorts", "EquipMed Innovations", "Electricore", "Shield & Hammer", "SteelMart", "Horizon Industrial", "MediSynth", "RedRock Materials", "InfraLogix", "DreamyParks", "Cognitix", "Centurion Defense", "BlueStream", "StarLink", "PowerPlow", "Evergreen House", "InfraPro", "NextGen Innovations", "MaxPower Industries", "Current Control Systems", "FlowMotion", "EchoMedia Solutions", "HealthStar", "ManufacturaPlus", "OptimizeTech", "SpecoPolymers", "Hyperion Tech", "AeroMech Industries", "YellowStone Industries", "PlayPlanet", "CareScape", "Prodigy Works", "Kinetic Engineering", "BlueFlame Industries", "PowerTech", "IndusSoft", "PixelLabs", "Hydraulix", "Alumitronix", "Mountainview Real Estate Investments", "OmniTech Industrial", "Kinetix Industrial", "TechWise", "Motorstorm Inc", "Apex Asset Services", "Secure Senses", "AlphaNet", "ByteLab", "SoilStride", "AppFactory", "SwiftHive Solutions", "TechHive", "InvenTek", "InovaIndustria", "GameGo", "Elevate Industries", "King\'s Landing Small Council", "InspectX", "NexaCorp", "IndusPro ServicesCo", "Nexon Auto Parts", "Industrial Intelligence", "BridgeWorks Engineering", "SoftFuse", "Titan Industries", "LifeCare Facilities", "Bluebird Wireless", "SkyWorks", "Northwind Industries", "PrimeTech", "Lumina Machineries", "MinePro Services", "OmniPower", "SmartSoft", "Nexa Materials", "Machinix Corporation", "BlueHills", "GealSoft", "BluePrint Industries", "LuxStay Hotels", "Vantage Engineering", "Voltwave", "IndustrialGen", "Peak Innovations", "IndustraCare", "AxiomWorks", "HealthWave", "PowerTronics", "IndusHR Employment Solutions", "DentalDyne", "Urban Innovations", "Inspectron", "CuraFácil", "HarborX", "InfraTechPro", "OffiSource", "FlexTronics Innovations", "OctoMech Industries", "NexusWorks Advertising", "Gamma Glassworks", "Transwave Technologies", "Iridium Machines", "WorkforcePro", "TorsionPro", "Lathe & Lunchroom Inc.", "Zentech Machines", "DataFortify", "Industrial Distributors Inc.", "TechHaven", "CleanCoat", "Mechadynamics", "Synthec", "CircuitCore", "SoftForge", "OptiNet", "OptimaTech", "Elite Industrial", "SynapseTech", "AeroMotive Solutions", "MachinEdge", "HealthMate", "OmegaMatter", "InfraSpect", "Catalyst Equipment Co.", "Vantage Works", "FlexiStaff", "HealthPlus", "IronNation", "Novatech Industrial Solutions", "Vertex Industrial Supply", "AssemblyWorks", "Software360", "Fizzy Fusion Co.", "ITPro", "TechBridge", "Nexa Dynamics", "GreenGuru", "Infotech", "Zenith Zippers", "Lifecraft", "IT Minds Consulting", "BigRigTech", "CareCore Inc.", "WavePoint", "NextGenSoft", "Market Movers", "Pinnacle Plating", "VibeWorks", "AutoChoice", "DriveTrain Dynamics", "SecureTechSys", "Steel & Smokehouse Corp.", "DataBridge", "Intellisystems", "SmartNet", "Telient", "Equinoxia", "ComunicaYa", "InfraTechx", "HealthShapers", "BlazeDirect", "NeuroTech Therapeutics", "Sunstream Manufacturing", "EliteIndustries", "DynaMation", "SafeDrive", "Skyline Systems", "Summit Ventures", "Apex Motors", "InsightBridge Consulting", "Integrated Support Technologies", "Harbor House", "DiverBank Industries", "DigitalTech", "Agronics", "ProcessGenius", "AxisTech", "PinnacleTech", "Invicta Engineering", "Pacific Energy", "VidaSana", "DynaStructures", "IndusTechMed", "CarZone", "Indumotive", "Electra Works", "Industrify", "NovaTech", "AirBridge Services", "IndusPro", "GreenWave Industrial Technologies", "MegaMovers", "GearGenius", "ElectroForge Industries", "Utopia Industrial", "BlueSky Express", "InfraGeniusx", "WoodCrafters", "Infinite Solutions Inc.", "CodeLab", "AlgoIndustries", "Teletronix", "ProdigiTech", "SunOptic", "IronSmith", "Hyperion Corporation", "Elite HR Solutions", "Cloudline Solutions", "BioCore", "NextStream", "Bella Home Decor", "ControlSoft", "Datadeck", "IndustrialMed", "Mirax Industries", "Apex Holdings", "Delta Contracting", "EcoFacil Solutions", "CosmoCon", "ApexMed", "Innovate Solutions", "Fuzionix", "Bluewave Semiconductors", "Insight Innovations", "AxiomTech", "StarStruck", "LifeEquip Innovations", "AeroMed", "Brooklyn Brownstone", "PharmaLab Industries", "EcoEdge", "Phoenix Manufacturing", "ProMach", "TechRidge", "LifeLine Industries", "AppWorks", "Circuitronix", "IronPulse", "OptiTrack", "EntretenimientoPremium", "ConstructCorp", "Veloce Hospitality", "AdVantage Solutions", "EcoVolt Energy", "PediMed Innovations", "PowerPlay Engineering", "Titan Manufacturing", "PharmaNet", "QualityQuest", "Apex Industrial Health Care", "TechLogic", "OptiFlex Industries", "MobileMaven", "Plate & Gear Manufacturing Co.", "Soper", "Sterling Drilling", "Novo Solutions", "Diamond Designs", "IntraIndustries", "ApexXcel", "SteelForge", "Elite Packaging Solutions", "Aspen Aesthetic", "FinTrust Holdings", "InnovateWorks", "JollyFields", "Oriontech", "Polaris Aerospace", "GraphicProdigy Industries", "Grandeur Industrial", "CoreCast", "TechVortex", "IdealWorks", "ClearCycle", "EcoGuard", "Airtech", "Divergent Finance", "AirTech Cargo", "OmniServe Industries", "Hymax Solutions", "OptiMold Industries", "GreenGlow", "LearningSphere", "ProtonParts", "Vitalitywise", "EnviroSafe", "Hightech Solutions", "SummitBank", "Nexus Group", "PowerNet", "VisionGuard", "PrintElite Co.", "PyroVision", "Catalyst Industrial", "Seabreeze Resorts & Infrastructure", "BienestarTotal", "Brick & Mortar Co.", "IndustriaTech", "GreenPower Engineering", "Vertex Dynamics", "WorkforceForge", "Innovate Industrial", "Horizon Industrial Properties", "Sunscape Hotels & Infrastructure", "Alpha Consulting", "DataMinds", "VitalPro Solutions", "ProcesaYa", "North Star Industrial Development", "TitanTech Industries", "Electromechanical Inc.", "TecnologíaWeb", "OutsourceWorks Global", "Appliconics", "MatDirecta", "Meditech Innovations", "AeroDrill Industries", "Nexus Industrial", "VinDistilCo", "GearUp", "MetalWorks", "Streamline Media", "CareVantage Corp.", "TecnoLab", "TechnoFuse", "Alpha Air Systems", "VelvetGloves", "Mid-Century Modern", "Enigma Tech", "Helix Industries", "InnoWorks", "PowerPak Industries", "Global Gear", "UnitedWorks", "AeroTech Industrial Systems", "NexGeniusx", "Automatech", "Auto Parts Prodigy", "VortexIndustries", "Chemstrat", "NexiCore", "ComfiHomes", "LabTech Innovations", "ProGen Medical Technologies", "Blue Ridge Investments", "TechStream Communications", "NutriBoost Agrochemicals", "BioMed", "SwiftFabrication", "Jetstream Drilling", "TerraNova Industries", "SkillBuilders", "BlueCollarTech", "Horizon Systems", "Weyland-Yutani Corporation", "DesarrolloWeb", "ChemicalMarket", "Hydromation", "QuickLaunch", "Ascend Enterprises", "GoldenTrack Industries", "InfraScopePro", "Elextronix", "CommSolutions", "CityPalms", "Soluciones360", "AquaSteel", "Paradigm Industrial", "Blue Ridge Industrial Properties", "CapitalCare", "Orion Engineering", "Quantum Innovations", "VelocityWorks", "PrecisionCo", "HealthLift Tech", "OutsourceWorks", "DataLab", "Global Green Packaging", "Fusion Electricals", "Blue Flame Energy", "Starlight Hotels & Infrastructure", "Empyrean Aviation", "Precision Dynamics Corp.", "MaterialesPlus", "CorePulse Technologies", "Diverchem", "InnovateQ", "ArcFlashTech", "ForgeWorks", "VisionTechSys", "AeroFresh", "NetWave", "PerfectLine", "IntraSoft", "Urban Upcycling", "Bites&Brews", "EcoPharm Industries", "PrecisionWorks", "HomeSweetAl. ", "Quantum Engineering", "Hands-On Learning", "Solvtech", "MechGen", "VozDigital", "WealthFusion", "DataFlow", "TechWorks", "Horizon Solutions", "HomelyStay", "BlueWave Energy", "WeldWorks", "Flexxon Manufacturing", "FlexiLogix", "EliteEngineered", "Advantech Machinery", "CodeWave Solutions", "TrackMaster", "TechMach", "Journeyscape", "LogicLeap", "MachTech", "Megaplex Manufacturing", "CureGuardian Corp.", "EcoHealth Solutions", "AeroComposites", "InfraQ", "DataPulse", "Nexus Corporation", "CoreTech Industrial Automation", "AgroTechWorks", "GrainsGalore", "Amplexus Industries", "InfraGenius", "HeavyDuty Workwear", "SwiftPack", "Farm-to-Table Foods", "NexusTech", "Perfect Build", "AccuBuild Industries", "HealthTrek", "HappyHappenings", "TalkLab", "DynaForge", "HealthMind", "ControlLogic", "Galactic Empire Bureau of Investigation", "IntuitiveIndustries", "Proline Systems", "IT Dynamics", "Skylink Services", "TechSavvy", "Centurion Heavy Industries", "IndustrialLogic", "LuxeThread", "EcoFuture", "Nexus Industrial Works", "Peak Performance", "ApexWorks", "Drill & Diner Manufacturing Corp.", "SkyRide", "Dynamo Industries", "Intellitrol", "Cozy Casa", "TriStar Industrial", "ClínicaDigital", "ApexFlow", "WebForge Solutions", "StellarNova", "Med-Tek", "HorizonTech", "HealthEquip", "Bridgeview Finance", "Triporistas", "Majestic", "TerraGen Biotech", "SmartPlex Solutions", "AeroHealth Systems", "AzarDivertido", "Pristine Labs", "AcmeTech", "HydroPools", "Minas Morgul Council of the Nazgul", "Cyberconix Solutions", "ArcLight", "TechNet Industrial Services", "Cardiactix", "Finesse Machinery", "HorizonTrust Industries", "MaquiCorp", "LifePro Equipments", "Nimbus Navigation", "Echelon Solutions", "Streamline Solutions", "MedSpot", "CareLink Equipments", "NextGen Industrial Automation", "ToughShield Workwear", "Brightway Builders", "AeroPro", "Voltic Industries", "FlexiMed", "SmartBrite", "Acuity Automation Solutions", "FashionStyle", "PuriFlux", "BioFusion", "Tectronix", "Olympus Capital Markets", "IndustriWave", "ConectaMax", "AgroChem Solutions", "ColorBlind", "Peak Industrial Group", "SkyBridge Robotics", "Excella Equipment", "TechPro", "Blaze Oil & Gas", "Geminus Machines", "FactoryFlow", "Stark Industries Energy Division", "PowerUpTech", "Kinetic Solutions", "Industrial Builders", "Industronic Machines", "AeroWorks", "Ferengi Commerce Authority", "Plasmet", "BioLubricants Inc.", "Securitech Industrix", "Machinix Solutions", "NanoAdhesive Co.", "FerroTech", "AgroMech", "AppGear", "Comunicarex", "RedMóvil", "MotionLabs", "TrueNorth Industries", "Virtue Machining", "PrecisionBioTech", "Encompass Engineering", "SignalShift", "CodeForge", "Kinetic Controls", "ElectraForge", "Nexia", "QuantumSys", "DataCom", "Mechanic\'s Choice", "MonyebeGreen", "AeroLogic", "MedicalX", "MachinaPro", "BiotechVision", "Synapse Industries", "EdIndustrial", "NexGenix", "PowerPlus", "Diamond Destiny Casinos", "OmniBridge Consulting", "CleanMed Industries", "Hydronova", "Platinum Oil & Gas", "PurePack", "Drillmax Energy", "InkMaster", "SwiftWorks Industries", "Catalyst Ventures", "FluidMasterX", "ProPack Innovations", "LimeLeaf", "PaperWorks Packaging Corp.", "SmartGridTech", "MotorMight", "ForgeWorks Industries", "IronWorks", "IndusCapital", "RoadMax", "NexusLab", "Streamline Co", "Pure Impact", "DataDriven Solutions", "MaquinaSoft", "EliteForge", "SmartFact", "Rustic Roots", "Precision Plastics", "SolucionesWeb", "SolidSteel", "IndigoWorks", "MetalMasters", "Prodigy Plastics", "Wonka Industries", "Longevity", "Steel for Good", "Voltcom Communications", "Synthel", "MedEquip Solutions", "IndusFarm", "MedServe", "MediFlow", "Gondor Council of the Wise", "Appvise", "BioProTech", "NeuroSense", "Digitalityx", "InnoSysTech", "Systemic Innovations", "Amplitude Systems Corp.", "InduDrive", "Timeless Treasures", "Optril", "SkyClean", "NexoCom", "ComunicarPro", "AeroLink Logistics", "Umpala", "FreshBites Inc", "Axionics", "Maritime Dynamics Inc.", "InsightBridge", "DataWise", "ProTech Industries", "GreenPrint", "MetalForge", "RoboTech", "Technico", "Forge & Fire Grills Corp.", "Proxity", "Industronic Dynamics", "PowerMakers", "AeroWorks Industries", "Summit Manufacturing", "IngeniaLab", "MechMind", "Kinetix Industries", "FutureIndustries", "Maker\'s Hub", "Synthronix", "VitalWise Inc.", "PharmaSoft", "IndustrialCap", "IndustrialElite", "Scandicraft", "SolutionsNow Consulting", "PrintPro Services", "DataCall", "SignalLogic", "Electrindustries", "Marina Industries & Resorts", "StarWorks Enterprises", "Synthetix Labs", "Agritech Solutions", "DiverInd", "Rapture City Council", "CareLife Corp.", "PureTech Industrial Technologies", "OmniCom", "Intellisense", "OmniChem Industries", "Equil", "Nexa Consulting", "Coastal Real Estate Holdings", "SafeStep Footwear", "Culinaire", "OptiMize", "SystemicWorks", "IndusBank Securities Group", "Systera", "Ironclad Industrial", "MetalMesh", "Apex Corporation", "PrintCraze Inc.", "Comunicar360", "CygnusTech", "ComfyZone", "MatLab360", "Ironclad Manufacturing", "NetVision Media", "SteelCore Industries", "StriveForce Solutions", "Electrical Equipment & Parts", "Eco-Friendly Manufacturing", "Gemstone Productions", "ConvergeCo", "Medinet", "QuantumWorks", "LifePulse", "Greenleaf Industries", "Creative Minds Tutoring", "Equinox Technologies Ltd.", "SwiftHorizon", "ForgeTech", "SonidoNet", "MáquinaMax", "ChainCraft", "Delta Design", "Axiomatic Industries", "MedTechWorks", "BioNova", "MundoVoice", "PowerPlex", "HealthLab", "Integracon", "LifeEquip Technologies", "Indusgear", "ClínicaWeb", "Clearview Securities", "PrintIt", "Metaltex", "OptiStaff Workforce Management", "BuildProTech", "Sterling Real Estate Holdings", "Everest Machines", "Tuscan Villa", "SterlingTrust Corporation", "Vulcan High Council", "Weld & Whisk Diners Ltd.", "Magnaquip", "SoftTrace", "Momentum Industrial Solutions", "SmartPlant", "Techbond", "SilverPeak Equipment", "BrainWave Solutions", "VehicleVirtuoso", "CloudLab", "Rayonix Manufacturing", "FuturePeak", "FabricateX"].sort()
  const industries = ["Technology Hardware, Storage & Peripherals", "Health Care Facilities", "Hotels, Restaurants & Leisure", "Application Software", "Tobacco", "Systems Software", "Trading Companies & Distributors", "Internet & Direct Marketing Retail", "Biotechnology", "Communications Equipment", "Automobiles", "Aerospace & Defense", "Internet Services & Infrastructure", "Software", "Semiconductors & Semiconductor Equipment", "Publishing", "Machinery", "Internet Software & Services", "Renewable Electricity", "Health Care Services", "Health Care Equipment", "Leisure Products", "Interactive Media & Services", "Industrial Machinery", "Casinos & Gaming", "Integrated Telecommunication Services", "Specialty Retail", "Computer Hardware", "IT Services", "Distributors", "Auto Components", "Industrial Conglomerates", "Electrical Components & Equipment", "Pharmaceuticals", "Office Services & Supplies", "Health Care Technology Services", "Containers & Packaging", "Food Retail", "Asset Management & Custody Banks", "Metals", "Semiconductors", "Health Care Equipment & Supplies", "Household Products", "Commercial Services & Supplies", "Diversified Consumer Services", "Air Freight & Logistics", "Internet Services & Products", "Electrical Equipment", "Electronic Equipment & Instruments", "Property & Casualty Insurance", "Health Care Supplies", "Apparel Retail", "Textiles, Apparel & Luxury Goods", "Multi-Sector Holdings", "Distillers & Vintners", "Personal Products", "Health Care Supplies & Consumables", "Solar", "Electronic Equipment", "Life & Health Insurance", "Multi-Utilities", "Media", "Diversified Support Services", "Employment Services", "Commodity Chemicals", "Home Entertainment Software", "Soft Drinks", "Media & Entertainment Services", "Diversified Financial Services", "Electric Utilities", "Education Services", "Data Processing & Outsourced Services", "Apparel, Accessories & Luxury Goods", "Automobile Manufacturers", "Infrastructure Software", "Capital Markets", "Specialty Chemicals", "Public Fundation", "Broadcasting & Cable TV", "IT Consulting & Other Services", "Health Care Providers & Services", "Home Furnishings", "Internet Retail", "Consumer Electronics", "Financial Exchanges & Data", "Interactive Media and Services", "Integrated Oil & Gas", "Food Products", "Investment Banking & Brokerage", "Construction Materials & Fixtures", "Electronic Equip, Instruments", "Equity Real Estate Investment Trusts", "Aluminum", "Durable Household Products", "Technology Services", "Environmental & Facilities Services", "Technology Distributors", "Internet Services and Infrastructure", "Building Products", "Office Electronics", "Advertising", "Real Estate Management & Development", "Construction Machinery", "Steel", "Electrical Components & Equip.", "Consumer Discretionary", "Fundation", "Advertising & Marketing", "Beverages", "Electronic Components", "Life Sciences Tools & Services", "Movies & Entertainment", "Construction Materials", "Agricultural Products", "Oil, Gas & Consumable Fuels", "Hotels, Resorts and Cruise Lines", "Chemicals", "Food and Staples Retailing", "Consumer Durables", "IT Services & Consulting", "Personal Services", "Diversified Telecommunication Services", "Data Processing & Outsourced Servs", "Human Resource & Employment Services", "Health Care Services & Equipments", "Technology Hardware & Equipment", "Electronic Equipment, Instruments & Components", "Multi-line Insurance", "Diversified Banks", "Paper Packaging", "Diversified Financials", "Managed Health Care", "Hotels, Resorts & Cruise Lines", "Home Furnishings & Fixtures", "Thrifts & Mortgage Finance", "Packaged Foods & Meats", "Specialty Stores", "Semiconductor Equipment", "Diversified Real Estate Activities", "Oil & Gas Exploration & Production", "Interactive Media", "Oil & Gas Equipment & Services", "Electronic Components & Equipment", "Oil & Gas Refining & Marketing", "Rental & Leasing Services", "Research & Consulting Services", "Cable & Satellite", "Multiline Retail", "Health Care Distributors", "Diversified REITs", "Household Durables", "Non-Profit", "Homebuilding", "Consumer Products", "Broadcasting", "Accessories", "Auto Parts & Equipment", "Footwear", "Internet Services and Products", "Internet and Direct Marketing Retail", "Real Estate Operating Companies", "Restaurants", "Gas Utilities", "Building Products & Equipment", "Asset Management & Custody", "Entertainment", "Specialized Consumer Services", "Consumer Durables & Apparel", "Airlines", "Insurance Brokers", "Restaurants & Catering", "Independent Power Producers & Energy Traders", "Paper & Forest Products", "Medical Devices & Equipment", "Food & Staples Retailing", "Household Appliances", "Internet & Direct Marketing", "Human Resource & Employment Svcs", "Media Conglomerates", "Oil & Gas Storage & Transportation", "Diversified Chemicals", "Hotels, Resorts & Cruise", "Banks", "Electrical Components", "Commercial & Professional Services", "Specialized Finance", "Professional Services", "Health Care Providers", "Precious Metals & Minerals", "Life Sciences Tools and Services", "Industrial Gases & Chemicals", "Aerospace and Defense Components", "Heavy Electrical Equipment", "Electronic Equipment and Instruments", "Interactive Home Entertainment", "Fertilizers & Agricultural Chemicals", "Health Care Technology & Systems", "Real Estate Services", "Home Furnishings & Housewares", "Biotechnology & Life Sciences", "Air Freight and Logistics", "Real Estate Investment Trusts (REITs)", "Museums, Art Galleries & Zoos", "Road & Rail", "Medical Supplies", "Hotel & Resort REITs", "Government Services", "Real Estate Development", "Hotels, Restaurants and Leisure", "Internet Services & Software", "IT Consulting and Other Services", "Consumer Appliances & Housewares", "Farm & Heavy Construction Machinery", "Renewable Utilities", "Paper Packaging & Containers", "Consumer Finance", "University", "Metal & Glass Containers", "Specialty Retailers", "Diversified Industrials", "Construction & Engineering", "Other Diversified Financial Services", "Security & Alarm Services", "Gold", "Commercial Services and Supplies", "Computer Storage and Peripherals", "Restaurants, Hotels, Bars & Leisure", "Consulting Services", "Airlines & Hotels", "Motorcycle Manufacturers", "Specialized REITs", "Consumer Appliances", "Industrial Metals & Mining", "Residential REITs", "Health Care Technology", "Marine", "Leisure Facilities", "Management & Consulting Services", "School", "Alternative Carriers", "Business Support Services", "Insurance", "Tires & Rubber", "Personal Products & Services", "Metals & Mining", "Food, Beverage & Tobacco", "Museum", "Financial Exchanges", "Internet Services & Infra", "Home Improvement Retail", "Diversified Media", "Railroads", "Apparel, Accessories & Luxury", "City Council", "Regional Goverment", "Construction Machinery & Heavy Trucks", "Real Estate Management & Services", "Health Care Services & Equipment", "Data Processing and Outsourced Services", "Transportation Infrastructure", "Industrial Services", "Food Distributors", "Internet and Direct Marketing", "Diversified Metals & Mining", "Mining Support Services", "Oil, Gas and Consumable Fuels", "Cybersecurity & Data Protection", "Technology Software", "Health Care Providers and Services", "Automotive Retail", "Airport Services", "Environmental & Facilities Svcs", "Consumer Services", "Textiles, Apparel & Luxury Gds", "Technology Hardware, Storage and Peripherals", "Independent Power and Renewable Electricity Producers", "Biotechnology & Pharmaceuticals", "Brewers", "Real Estate Management & Development Services", "Medical Devices", "Investment Banking & Brokerage (I Banks)", "Electronic Equipment & Parts", "Real Estate", "Apparel & Accessories", "Food Retailing", "Auto Parts", "Agricultural and Farm Machinery", "Homebuilding & Construction", "Wireless Telecommunication Services", "Board Games", "Broadcasting & Entertainment", "Integrated Telecommunication Svcs", "Commercial Printing Services", "Water Utilities", "Construction and Engineering", "Investment Companies", "Agricultural & Farm Machinery", "Soft Drinks & Non-Alcoholic Beverages", "Paper Products", "Video Games", "National Goverment", "Information Technology Services", "Movies and Entertainment", "Industrial REITs", "Industrial Gases", "Packaged Foods and Meats"].sort()
  const subindustries = ["Technology Hardware, Storage & Peripherals", "Long-Term Care Facilities", "Hotels, Resorts & Cruise Lines", "Systems Software", "Tobacco", "Trading Companies & Distributors", "Internet & Direct Marketing Retail Retailing", "Biotechnology Health Care", "Communications Equipment", "Automobile Manufacturers", "Aerospace & Defense", "Internet Services & Infrastructure", "Application Software", "Semiconductors & Semiconductor Equipment", "Publishing", "Industrial Machinery", "Internet Software & Services", "Solar", "Health Care Services", "Health Care Equipment", "Leisure Products", "Interactive Media & Services", "Casinos & Gaming Consumer Services", "Interactive Home Entertainment", "Integrated Telecommunication Services", "Homefurnishing Retail", "Computer Storage & Peripherals", "IT Consulting & Other Services", "Distributors", "Biotechnology", "Auto Parts & Equipment", "Industrial Conglomerates", "Electrical Components & Equipment", "Pharmaceuticals", "Office Services & Supplies", "Health Care Supplies", "Health Care Technology Services", "Metal & Glass Containers", "Food Retail", "Asset Management & Custody Banks", "Steel", "Specialty Stores", "Semiconductors", "Household Products", "Education Services", "Air Freight & Logistics", "Diversified Support Services", "Electronic Equipment & Instruments Manufacturing", "Property & Casualty Insurance", "Apparel Retail", "Footwear", "Multi-Sector Holdings", "Distillers & Vintners", "Personal Products", "Health Care Supplies & Consumables", "Construction Machinery & Heavy Trucks", "Solar Energy", "Electronic Equipment", "Life & Health Insurance", "Multi-Utilities", "Electronic Equipment & Instruments", "Electronic Components & Equipment", "Diversified Media", "Software Tools", "Research & Consulting Services", "Employment Services", "Diversified Chemicals", "Home Entertainment Software", "Soft Drinks", "Movies & Entertainment", "Other Diversified Financial Services", "Specialized Consumer Services", "Electric Utilities", "Health Care Equipment & Supplies", "Software", "Data Processing & Outsourced Services", "Apparel, Accessories & Luxury Goods", "Life Sciences Tools & Services", "Home Furnishings", "Investment Banking & Brokerage", "Specialty Chemicals", "Commodity Chemicals", "Public Fundation", "Broadcasting", "Technology Hardware, Storage", "Capital Markets", "Health Care Providers & Services", "Internet Retail", "Tissue, Paper & Forest Products", "Medical Devices & Equipment", "Consumer Electronics", "Financial Exchanges & Data", "Internet Services and Products", "Integrated Oil & Gas", "Agricultural Products", "Medical Supplies", "Commercial Services & Supplies", "Building Products", "Equity Real Estate", "IT Services", "Aluminum", "Home Furnishings & Fixtures", "Environmental & Facilities Services", "Technology Distributors", "Internet Services and Infrastructure", "Office Electronics", "Advertising", "Real Estate Operating Companies", "Construction Machinery and Heavy Trucks", "Industrial Conglomerates Industrials", "Recreational Products", "Agricultural & Farm Machinery", "Renewable Electricity", "Commercial Printing", "Laboratory Analytical Instruments", "Home Improvement Retail", "Fundation", "Brewers", "Internet & Direct Marketing Retail", "Health Care Facilities & Services", "Electronic Components", "Advertising Agencies", "Life Sciences Tools & Services - Contract Research & Manufacturing", "Museums, Zoos, and Amusement Parks", "Construction Materials", "Consumer Electronics Consumer Discretionary", "Oil & Gas Exploration & Production", "Hotels, Resorts and Cruise Lines", "Food and Staples Retailing", "Consumer Electronics & Appliances", "Health Care Equipment & Supplies Manufacturing", "Personal Services", "Alternative Carriers & Services", "Data Processing & Outsourced Servs", "Human Resource & Employment Services", "Diversified Real Estate Activities", "Packaged Foods & Meats", "Consumer Electronics and Home Appliances", "Health Care Distributors", "Electronic Equipment, Instruments & Components", "Textiles, Apparel & Luxury Goods", "Building Products & Equipment", "Multi-line Insurance", "Education & Training Services", "Financial Exchanges", "Regional Banks", "Paper Packaging", "Other Diversified Financials", "Managed Health Care", "Advertising & Marketing", "Auto Manufacturers", "Thrifts & Mortgage Finance", "Semiconductor Equipment", "Plastic & Rubber Product Making Equipment", "Media", "Mobile Interactive Media", "Oil & Gas Equipment & Services", "Electronic Manufacturing Services", "Computer & Electronics Retail", "IT Security Software & Services", "Oil & Gas Refining & Marketing", "Rental & Leasing", "Cable & Satellite", "Department Stores", "Diversified REITs", "Non-Profit", "Systems Software Software & Services", "Homebuilding", "Advanced Medical Equipment", "Internet and Direct Marketing Retail", "Home Furnishings & Housewares", "Restaurants", "Gas Utilities", "Health Care Equipmen", "Asset Management & Custody", "Oil & Gas Exploration and Production", "Oil & Gas Equipment, Services & Distribution", "Computer Hardware & Peripherals", "Auto Parts", "Construction & Farm Machinery", "Airlines", "Insurance Brokers", "Restaurants & Catering", "IT Services & Consulting", "Defense", "Independent Power Producers & Energy Traders", "Education Software", "Publishing and Printing", "Electric Vehicles and Other Motor Vehicles", "Hospitals", "Medical Instruments & Supplies", "Advanced Medical Equipment & Technology", "Food Retailing & Wholesaling", "Household Appliances", "Internet & Direct Marketing", "Hotels, Restaurants & Leisure", "Casinos & Gaming", "Medical & Diagnostic Products", "Oil & Gas Storage & Transportation", "Movies & Entertainment Consumer Discretionary", "Electronic Gaming & Multimedia", "Diversified Banks", "Agricultural & Farm Machinery & Equipment", "Electrical Components", "Food Distributors", "Investment Banking & Brokerage Services", "Electronic Components & Equip.", "Other Specialized Finance", "Specialty Retail", "Diversified Metals & Mining", "Computer Hardware", "Precious Metals & Minerals", "Life Sciences Tools and Services", "Restaurants & Leisure", "Motorcycle Manufacturers", "Industrial Gases & Chemicals", "Internet", "Aerospace and Defense Components", "Industrial Machinery Products", "Diversified Real Estate Activities Real Estate", "Heavy Electrical Equipment", "Coal & Consumable Fuels", "Employment Services Professional Services", "Electronic Equipment and Instruments", "Fertilizers & Agricultural Chemicals", "Internet Services & Products", "Health Care Technology", "Diversified Consumer Services", "HR Consulting & Other Services", "Interactive Media and Services", "Data Processing & Outsourced Svcs", "Real Estate Services", "Housewares & Specialties", "Oil & Gas Drilling", "Health Care Supplies Health Care", "Air Freight and Logistics", "Specialized REITs", "Paper Packaging Containers & Packaging", "Museums, Art Galleries & Zoos", "Passenger Transportation Services", "Hotel & Resort REITs", "Government Services", "Agricultural and Farm Machinery", "Real Estate Development", "IT Services Software & Services", "Leisure Facilities", "IT Consulting and Other Services", "Consumer Appliances & Housewares", "Electrical Components & Equip.", "Automotive Retail", "Renewable Utilities", "Diversified Real Estate", "Paper Packaging & Containers", "Consumer Finance", "University", "Home Improvement Retailers", "Diversified Industrials", "Construction & Engineering", "Staffing & Employment Services", "Security & Alarm Services", "Accessories", "Gold", "Tires & Rubber", "Computer Storage and Peripherals", "Environmental Software", "Professional Services", "Consulting Services", "Specialized Finance", "Enterprise Resource Planning Software", "Consumer Appliances", "Residential REITs", "Marine Ports & Services", "Management & Consulting Services", "Trucking", "Data Processing & Analytics", "School", "Alternative Carriers", "Equity Real Estate Investment Trusts", "Health Care Distributors Health Care", "Logistics & Supply Chain Management", "Industrial Machinery & Components", "Internet Software & Services Development", "Diversified Telecommunication Services", "Personal Products & Services", "Movies and Entertainment", "Wireless Telecommunication Services", "Non-Profit Organizations/Foundations", "Automobile Manufacturers (Major)", "Infrastructure Software", "Legal Services", "Art", "Renewable Electricity Generators", "Ports & Marine Terminals", "Employment Training Services", "Construction & Engineering Services", "Diversified Financial Services", "Commercial Printing Services", "Internet Services & Infra", "Footwear Retail", "Railroads", "Automotive Aftermarket", "City Council", "Diversified Construction Materials", "Paper Products", "Coffee & Tea", "IT", "Regional Goverment", "Apparel, Accessories & Luxury", "Construction Materials & Fixtures", "Outpatient & Home Health Care", "Specialized Chemicals", "Health Care Distributors & Services", "Construction Machinery", "Electronic Manufacturing Services (EMS)", "Data Processing and Outsourced Services", "Airport Services", "Industrial Services", "Insurance", "Internet and Direct Marketing", "Renewable Electricity Generation", "Testing & Measuring Equipment", "Other Professional Services", "Mining Support Services", "Enterprise Software", "Hotels, Resorts & Cruise Lines Consumer Discretionary", "Oil and Gas Storage and Transport", "Human Resource & Employment", "Consumer Products", "Cybersecurity & Data Protection", "Airport Services & Ground Handlers", "Technology Software", "Health Care Technology Health Care", "Diversified Telecommunication Svcs", "Electronic Components Distributors", "Human Resource Management Software", "Contract Research & Services", "Environmental & Facilities Svcs", "Technology Hardware, Storage and Peripherals", "Health Care Equipment & Supplies Health Care", "Medical Equipment & Supplies", "Electronic Components & Instruments Distribution", "Alternative Carriers & Telecommunication Services", "Real Estate Management & Development Services", "Technology Hardware & Equipment", "Medical Equipment, Devices & Supplies", "Investment Banking & Brokerage (I Banks)", "Advertising & Marketing Services", "Integrated Steel", "Internet Services & Products Software & Services", "Homebuilding Supplies & Fixtures", "Food Retailing", "Home Entertainment Software & Services", "Other Diversified Consumer Services", "Seafood", "Health Care Facilities", "Leisure Products & Products Serv", "Board Games", "IT Consulting & Other Services IT Services", "Other Specialty Stores", "Electronic Components & Equipments", "Integrated Telecommunication Svcs", "Entertainment", "Commercial Printing Services Consumer Services", "Oil, Gas & Consumable Fuels", "Water Utilities", "Construction and Engineering", "Other Investment Companies", "Financial", "Non-Alcoholic Beverages", "Diversified Metals & Mining Metals & Mining", "Video Games", "National Goverment", "Packaged Foods and Meats", "Marine", "Home Appliances & Electronics", "Agricultural Chemicals", "Industrial REITs", "Staffing & Outsourcing Services", "Industrial Gases", "HVAC"].sort()

  // Init showResults bool".
  const [showResults, setShowResults] = useState(false)

  // Init translators' list
  const [translators, setTranslators] = useState<Translator[]>([])

  // Init button disabler  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true) // Disable submission button

    // Simulate API call
    setTimeout(async () => {
      const results = await findBestTranslator(formData) // get best translators
      setTranslators(results) // set best translators
      setShowResults(true) // show best translators
      setIsSubmitting(false)
    }, 1000)
  }
  
  // Add changes to formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    console.log({...formData, [name]: value})
  }
  // Add selection changes to formData 
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    console.log({...formData, [name]:value})
  }
  // Add slider changes to formData
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
    console.log({...formData, [name]:value[0]})
  }
  // Add slider changes to formData
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
    cosole.log({...formData, [name]:checked})
  }
  
  return (
    <div className="container my-auto mx-auto px-4 py-8 max-w-6xl">
      {/*
      * Title & Theme
      */}
      <div className="flex justify-between items-center mb-8">
        {/*
        * Title
        */}
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            iDISC
          </h1>
        </div>
        {/*
        * Theme
        */} 
        <ThemeToggle />
      </div>

      {/*
      * Ternary Logic
      */}
      {!showResults ? (
        /*
        * Formulary Page
        */ 
        <Card className="w-full border border-border/40 shadow-lg animate-fade-in">
          {/*
          * Header
          */}
          <CardHeader className="pb-2 border-b">
            <div className="flex">
              <div>
                  <CardTitle className="text-2xl">Making assignment easy</CardTitle>
                  <CardDescription>
                    We combine knowledge and technology to boost your productivity
                  </CardDescription>
              </div>
              <div className=" ml-auto">
                <div className="flex">
                    <User></User>
                    <h2 className="text-md font-medium">User Identification</h2>
                </div>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder=" e.g. #123654"
                        className=" border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content py-2 pl-1 w-full rounded-md border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] resize-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      />
                      
              </div>
            </div>
          </CardHeader> 
          {/*
          * Card Content
          * Form & Submit Button
          */}
          <CardContent className="pt-6">
            {/*
            * Form
            */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/*
                Card Content:
                Language Information & Project Details
              */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 
                  Language Information
                */}
                <div className="space-y-6 animate-slide-up stagger-1">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Globe className="h-5 w-5" />
                    <h2 className="text-lg">Language Information</h2>
                  </div>

                  {/*
                    Source Language and Target Language
                  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/*
                      Source Language
                    */} 
                    <div className="space-y-2">
                      <Label htmlFor="sourceLanguage">Source</Label>
                      <Select onValueChange={(value) => handleSelectChange("sourceLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select source language" />
                        </SelectTrigger>

                        <SelectContent>
                          {
                            sourceLanguages.map((lang, k)=>(
                              <SelectItem value={lang} key={k}>{lang}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    {/*
                    * Target Language
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="targetLanguage">Target</Label>
                      <Select onValueChange={(value) => handleSelectChange("targetLanguage", value)} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select target language" />
                        </SelectTrigger>
                        <SelectContent>
                        {
                          targetLanguages.map((lang, k) =>(
                            <SelectItem value={lang} key={k}>{lang}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                                    {/*
                    Field Specialty & Task Type
                  */}
                  <div className="flex gap-4">
                    {/*
                    * Field Specialty
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="Wildcard">Wildcard</Label>
                      <Select onValueChange={(value) => handleSelectChange("wildcard", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select wildcard" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            wildcards.map((card, k) =>(
                              <SelectItem value={card} key={k}>
                                {card}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    {/*
                    * Task Type
                    */}
                    <div className="space-y-2">
                      <Label htmlFor="taskType">Task Type</Label>
                      <Select onValueChange={(value) => handleSelectChange("taskType", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            taskTypes.map((field, k) =>(
                              <SelectItem value={field} key={k}>
                                {field}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Select onValueChange={(value) => handleSelectChange("manufacturer", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manufacturer" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            manufacturers.map((man, k) =>(
                              <SelectItem value={man} key={k}>
                                {man}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select onValueChange={(value) => handleSelectChange("manufacturerIndustry", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            industries.map((ind, k) =>(
                              <SelectItem value={ind} key={k}>
                                {ind}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subindustry">Subindustry</Label>
                      <Select onValueChange={(value) => handleSelectChange("manufacturerSubindustry", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subindustry"/>
                        </SelectTrigger>
                        <SelectContent>
                          {
                            subindustries.map((sub, k) =>(
                              <SelectItem value={sub} key={k}>
                                {sub}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/*
                  Project Details
                */}
                <div className="space-y-6 animate-slide-up stagger-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <FileText className="h-5 w-5" />
                    <h2 className="text-lg">Project Details</h2>
                  </div>

                  {/*
                  * Budget & Urgency
                  */}
                  <div className="space-y-4 ">

                    {/*
                    * Budget
                    */}
                    <div className="space-y-2 ">
                      <div className="flex justify-between">
                        <Label htmlFor="pricePerHour">Price($)/Hour</Label>
                        <span className="text-sm text-muted-foreground">
                          ${formData.pricePerHour.toLocaleString()}
                        </span>
                      </div>
                      <Input
                        type="range"
                        name="pricePerHour"
                        value={formData.pricePerHour}
                        onChange={handleChange}
                        min={5}
                        max={60}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$5</span>
                        <span>$60</span>
                      </div>
                    </div>
                    {/*
                    * Min Quality
                    */}
                    <div className="space-y-2 ">
                      <div className="flex justify-between">
                        <Label htmlFor="minQuality">Min Quality</Label>
                        <span className="text-sm text-muted-foreground">
                          {formData.minQuality}
                        </span>
                      </div>
                      <Input
                        type="range"
                        name="minQuality"
                        value={formData.minQuality}
                        onChange={handleChange}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1</span>
                        <span>10</span>
                      </div>
                    </div>

                    </div>
                  </div>
                </div>
              


              {/*
              * Submit Button 
              */}
              <div className="pt-4 animate-slide-up stagger-4">
                <Button
                  type="submit"
                  className="w-full py-6 text-lg group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      <span>Finding your perfect translator...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      <span>Find Best Translator</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        /*
         *  Results Page
         */
        <div className="space-y-6 animate-fade-in">
          <Button variant="outline" onClick={() => setShowResults(false)} className="mb-4">
            Back to Form
          </Button>
        <TranslatorResults translators={translators} />
        </div>
      )}
    </div>
  )
}

