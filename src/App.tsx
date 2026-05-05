import { motion } from 'motion/react';
import { 
  Eye, CheckCircle2, ShieldAlert, Activity, HeartHandshake, 
  Database, Smartphone, Truck, ShieldCheck, MapPin, Search, 
  Stethoscope, Users, Building, AlertTriangle, FileText, Share2
} from 'lucide-react';
import React from 'react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const EMRDemoForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    age: '',
    gender: 'M',
    od_ucva: '',
    od_bcva: '',
    od_pinhole: '',
    os_ucva: '',
    os_bcva: '',
    os_pinhole: '',
    od_sphere: '',
    od_cyl: '',
    od_axis: '',
    os_sphere: '',
    os_cyl: '',
    os_axis: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    
    if (value.trim() === '') return error;
    
    if (name.includes('ucva') || name.includes('bcva') || name.includes('pinhole')) {
      if (!/^(6|20)\/\d+$|^CF$|^HM$|^PL$|^NPL$|^-$/i.test(value)) {
        error = 'Format: 6/6, 20/20, CF, HM...';
      }
    } else if (name.includes('sphere') || name.includes('cyl')) {
      const num = parseFloat(value);
      if (isNaN(num)) error = 'Invalid num';
      else if (num < -20 || num > 20) error = '-20 to +20';
    } else if (name.includes('axis')) {
      const num = parseInt(value, 10);
      if (isNaN(num) || !/^\d+$/.test(value)) error = 'Invalid num';
      else if (num < 0 || num > 180) error = '0 to 180';
    } else if (name === 'age') {
      const num = parseInt(value, 10);
      if (isNaN(num) || num < 0 || num > 120) error = '0 - 120';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getInputClassName = (name: string, baseClass: string) => {
    const error = errors[name];
    if (error) {
      return `${baseClass} border-red-500 focus:ring-red-500 text-red-900 bg-red-50 focus:border-red-500`;
    }
    return `${baseClass} border-slate-200 focus:ring-brand-500`;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Standardized Eye Examination Form</h3>
          <p className="text-xs text-slate-500 font-mono mt-1">EMR_SYSTEM_v2.0 // OFFLINE_CAPABLE</p>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 space-y-8 bg-white h-[600px] overflow-y-auto w-full">
        {/* Patient Info */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">1. Patient Information</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Patient ID (Auto)</label>
              <input type="text" disabled value="AP-VV-849201" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" className={getInputClassName('name', "w-full bg-white border rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 outline-none transition-all")} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Age / Gender</label>
              <div className="flex gap-2 relative">
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className={getInputClassName('age', "w-16 bg-white border rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 outline-none")} />
                <select name="gender" value={formData.gender} onChange={handleChange} className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-brand-500 outline-none">
                  <option>M</option><option>F</option><option>O</option>
                </select>
                {errors.age && <span className="absolute -bottom-4 left-0 text-[10px] text-red-500 break-words max-w-[60px]">{errors.age}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Acuity */}
        <div className="w-full overflow-x-auto pb-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">2. Visual Acuity</h4>
          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 min-w-max">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 font-medium">
                <tr>
                  <th className="py-2 px-4 border-b">Eye</th>
                  <th className="py-2 px-4 border-b">UCVA</th>
                  <th className="py-2 px-4 border-b">BCVA</th>
                  <th className="py-2 px-4 border-b">Pinhole</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-brand-700">OD <span className="text-xs font-normal text-slate-500">(Right)</span></td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_ucva" value={formData.od_ucva} onChange={handleChange} placeholder="6/18" className={getInputClassName('od_ucva', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_ucva}/>
                    {errors.od_ucva && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.od_ucva}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_bcva" value={formData.od_bcva} onChange={handleChange} placeholder="6/6" className={getInputClassName('od_bcva', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_bcva}/>
                    {errors.od_bcva && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.od_bcva}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_pinhole" value={formData.od_pinhole} onChange={handleChange} placeholder="-" className={getInputClassName('od_pinhole', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_pinhole}/>
                    {errors.od_pinhole && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.od_pinhole}</div>}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-brand-700">OS <span className="text-xs font-normal text-slate-500">(Left)</span></td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_ucva" value={formData.os_ucva} onChange={handleChange} placeholder="6/12" className={getInputClassName('os_ucva', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_ucva}/>
                    {errors.os_ucva && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.os_ucva}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_bcva" value={formData.os_bcva} onChange={handleChange} placeholder="6/6" className={getInputClassName('os_bcva', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_bcva}/>
                    {errors.os_bcva && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.os_bcva}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_pinhole" value={formData.os_pinhole} onChange={handleChange} placeholder="-" className={getInputClassName('os_pinhole', "w-16 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_pinhole}/>
                    {errors.os_pinhole && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-16">{errors.os_pinhole}</div>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Refraction */}
        <div className="w-full overflow-x-auto pb-4">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">3. Refraction</h4>
          <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 min-w-max">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 font-medium">
                <tr>
                  <th className="py-2 px-4 border-b">Eye</th>
                  <th className="py-2 px-4 border-b">Sphere (SPH)</th>
                  <th className="py-2 px-4 border-b">Cylinder (CYL)</th>
                  <th className="py-2 px-4 border-b">Axis</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 px-4 font-bold text-brand-700">OD</td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_sphere" value={formData.od_sphere} onChange={handleChange} placeholder="-1.50" className={getInputClassName('od_sphere', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_sphere}/>
                    {errors.od_sphere && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.od_sphere}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_cyl" value={formData.od_cyl} onChange={handleChange} placeholder="-0.50" className={getInputClassName('od_cyl', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_cyl}/>
                    {errors.od_cyl && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.od_cyl}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="od_axis" value={formData.od_axis} onChange={handleChange} placeholder="180" className={getInputClassName('od_axis', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.od_axis}/>
                    {errors.od_axis && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.od_axis}</div>}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-brand-700">OS</td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_sphere" value={formData.os_sphere} onChange={handleChange} placeholder="-1.25" className={getInputClassName('os_sphere', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_sphere}/>
                    {errors.os_sphere && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.os_sphere}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_cyl" value={formData.os_cyl} onChange={handleChange} placeholder="-0.75" className={getInputClassName('os_cyl', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_cyl}/>
                    {errors.os_cyl && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.os_cyl}</div>}
                  </td>
                  <td className="py-2 px-4 align-top">
                    <input type="text" name="os_axis" value={formData.os_axis} onChange={handleChange} placeholder="175" className={getInputClassName('os_axis', "w-20 border rounded px-2 py-1 bg-white focus:ring-2 outline-none")} title={errors.os_axis}/>
                    {errors.os_axis && <div className="text-[10px] text-red-500 leading-[1.1] mt-1 break-words w-20">{errors.os_axis}</div>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Action */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className={`px-6 py-2 rounded-lg font-medium text-sm transition-all shadow-md ${Object.values(errors).some(e => e !== '') ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'}`} disabled={Object.values(errors).some(e => e !== '')}>
            Save & Transmit Record
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-brand-50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900 leading-tight">AP Vision Outreach</h1>
              <p className="text-xs text-brand-600 font-medium">by Akriti Ophthalmic Pvt Ltd</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#challenge" className="hover:text-brand-600 transition-colors">The Challenge</a>
            <a href="#vision" className="hover:text-brand-600 transition-colors">Our Vision</a>
            <a href="#workflow" className="hover:text-brand-600 transition-colors">Workflow</a>
            <a href="#emr" className="hover:text-brand-600 transition-colors">Digital EMR</a>
          </div>
          <a href="#emr" className="md:inline-flex hidden h-10 items-center justify-center rounded-full bg-brand-600 px-6 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all">
            View EMR Form
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-100/50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-3xl opacity-50 -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <MapPin className="w-3.5 h-3.5" />
                Andhra Pradesh Initiative
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Illuminating Lives <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500">Across All Districts</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
                A technology-driven, data-centric initiative to bring quality eye care and affordable spectacles to every citizen across all 26 districts of Andhra Pradesh.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#vision" className="h-12 inline-flex items-center justify-center rounded-full bg-brand-600 px-8 text-base font-medium text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 transition-all">
                  Our Approach
                </a>
                <a href="#challenge" className="h-12 inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-8 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                  Understand the Challenge
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section id="challenge" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Unseen Challenge</h2>
              <p className="text-lg text-slate-600">Millions of citizens in Andhra Pradesh live with preventable or treatable vision impairments — silently affecting their ability to learn, work, and thrive.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6 text-amber-500" />,
                title: "Access Gap",
                desc: "Large sections of rural and semi-urban populations have never undergone a formal eye examination."
              },
              {
                icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
                title: "Affordability Barrier",
                desc: "The cost of spectacles and professional consultations remains out of reach for economically weaker sections."
              },
              {
                icon: <Activity className="w-6 h-6 text-brand-500" />,
                title: "Cascading Impact",
                desc: "Uncorrected vision impairs school performance, reduces workforce productivity, and diminishes the overall quality of life."
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:border-brand-100 transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section id="vision" className="py-24 bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-400 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">A Comprehensive Outreach Program</h2>
                <p className="text-brand-100 text-lg leading-relaxed mb-8">
                  Our goal is to conduct widespread vision screening, distribute high-quality, affordable eyeglasses, and cover all citizens in need across Andhra Pradesh, ensuring no one is left behind.
                </p>
              </FadeIn>
              
              <ul className="space-y-6">
                {[
                  "Fully technology-driven, data-centric model for maximum efficiency.",
                  "End-to-end workflow: from screening and diagnosis to spectacle delivery.",
                  "Rooted in public health principles and highly scalable.",
                  "Coverage across all 26 districts of the state."
                ].map((text, i) => (
                  <FadeIn key={i} delay={0.1 * i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-300" />
                    </div>
                    <p className="text-brand-50">{text}</p>
                  </FadeIn>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <FadeIn delay={0.2}>
                <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden glass-dark p-8 relative">
                   {/* Abstract representation of the state/data */}
                   <div className="absolute inset-0 bg-gradient-to-br from-brand-800/50 to-transparent"></div>
                   <div className="relative h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <Database className="w-10 h-10 text-brand-300 opacity-50" />
                        <div className="text-right">
                          <div className="text-4xl font-bold text-white mb-1">26</div>
                          <div className="text-sm text-brand-300 uppercase tracking-widest font-semibold">Districts Covered</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-400 w-[85%] rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-300 w-[60%] rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 w-[92%] rounded-full"></div>
                        </div>
                      </div>
                   </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Precision */}
      <section id="workflow" className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Precision at Every Level</h2>
              <p className="text-lg text-slate-600">We employ a robust, multi-tier approach to identify, diagnose, and treat vision impairments efficiently.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8 text-brand-600" />,
                title: "In-Field Screening",
                desc: "Diagnostic units deployed directly in remote and underserved areas for maximum reach."
              },
              {
                icon: <Stethoscope className="w-8 h-8 text-brand-600" />,
                title: "Trained PMOAs",
                desc: "Professional ophthalmic assistants perform comprehensive screenings, visual acuity tests, and refraction."
              },
              {
                icon: <Smartphone className="w-8 h-8 text-brand-600" />,
                title: "Tele-Ophthalmology",
                desc: "Remote expert consultations available instantly for complex cases requiring specialist opinions."
              },
              {
                icon: <Building className="w-8 h-8 text-brand-600" />,
                title: "Structured Referrals",
                desc: "Seamless integration with government and regional hospitals for advanced surgical interventions."
              }
            ].map((feature, i) => (
              <FadeIn key={i} delay={0.1 * i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Workflow & Spectacles */}
          <div className="mt-24 grid md:grid-cols-2 gap-8">
            <FadeIn className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">The Digital Backbone</h3>
              </div>
              <p className="text-slate-600 mb-6">Data flows seamlessly from the field to the central systems, compliant with eHR standards.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">1</div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 font-medium text-slate-700 text-sm">Patient Screening via Tablet App</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">2</div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 font-medium text-slate-700 text-sm">PMOA Real-Time Data Entry</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">3</div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 font-medium text-slate-700 text-sm">Centralized EMR Storage (Timestamped)</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">4</div>
                  <div className="flex-1 p-3 rounded-xl bg-slate-50 font-medium text-slate-700 text-sm">Automated Government Reporting Dashboard</div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Spectacle Distribution</h3>
              </div>
              <p className="text-slate-600 mb-6">Ensuring the right prescription reaches the right citizen, quickly and transparently.</p>
              
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 mt-0.5"><HeartHandshake className="w-4 h-4" /></div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Delivered Within 21 Days</strong>
                    <span className="text-sm text-slate-600">Rapid turnaround time for manufacturing and distribution.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 mt-0.5"><Smartphone className="w-4 h-4" /></div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Interactive SMS Alerts</strong>
                    <span className="text-sm text-slate-600">Patients receive updates before and during delivery.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 mt-0.5"><ShieldCheck className="w-4 h-4" /></div>
                  <div>
                    <strong className="block text-slate-900 mb-1">Digital Proof & Quality</strong>
                    <span className="text-sm text-slate-600">Strict quality checks with digital proof of delivery for accountability.</span>
                  </div>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* EMR Form Demo */}
      <section id="emr" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            
            {/* Form UI */}
            <FadeIn>
              <EMRDemoForm />
            </FadeIn>

            {/* Context */}
            <div className="pt-12">
              <FadeIn delay={0.2}>
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Digitized Clinical Records</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Our proprietary Electronic Medical Records (EMR) interface is optimized for tablet devices used by field staff. It ensures clean, structured data collection covering key diagnostic metrics including visual acuity, refraction, and IOP.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                    <p className="text-sm text-slate-700">Offline-first capability for remote villages</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                    <p className="text-sm text-slate-700">Standardized dropdowns to prevent typos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                    <p className="text-sm text-slate-700">Automatic logic validation for prescriptions</p>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-white font-bold text-lg">AP Vision Outreach</div>
              </div>
              <p className="max-w-sm text-sm">
                A technology-enabled, transparent, and scalable commitment to clear vision for every citizen in Andhra Pradesh.
              </p>
            </div>
            <div className="md:text-right">
              <h4 className="text-white font-medium mb-2">Powered By</h4>
              <p className="text-lg font-serif italic text-slate-300">Akriti Ophthalmic Pvt Ltd</p>
              <p className="text-sm">Hyderabad, TG, India</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-slate-800 pt-8 text-xs">
            <p>© {new Date().getFullYear()} Akriti Ophthalmic Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

