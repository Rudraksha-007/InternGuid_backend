// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.jsx";
// import { Badge } from "../ui/badge.jsx";
// import { Brain, MapPin, Users, BarChart3, Shield, Clock, Zap, CheckCircle } from "lucide-react";

// const Feature = () => {
//   const features = [
//     {
//       icon: Brain,
//       title: "AI-Powered Matching",
//       description: "Advanced machine learning algorithms analyze skills, qualifications, and preferences to find the perfect internship match.",
//       tags: ["Machine Learning", "Smart Algorithms"]
//     },
//     {
//       icon: MapPin,
//       title: "Location Intelligence",
//       description: "Considers geographical preferences, rural representation, and aspirational districts for inclusive placement opportunities.",
//       tags: ["Geographic Matching", "Inclusive Access"]
//     },
//     {
//       icon: Users,
//       title: "Affirmative Action Support",
//       description: "Ensures fair representation across social categories, rural areas, and different demographic groups.",
//       tags: ["Diversity", "Equal Opportunity"]
//     },
//     {
//       icon: BarChart3,
//       title: "Capacity Optimization",
//       description: "Intelligently manages internship capacity across industries to maximize placement opportunities.",
//       tags: ["Resource Management", "Optimization"]
//     },
//     {
//       icon: Shield,
//       title: "Merit & Equity Balance",
//       description: "Balances merit-based selection with affirmative action requirements for fair and effective placements.",
//       tags: ["Fair Selection", "Balanced Approach"]
//     },
//     {
//       icon: Clock,
//       title: "Real-time Processing",
//       description: "Processes thousands of applications efficiently, reducing placement delays and improving user experience.",
//       tags: ["Fast Processing", "Scalability"]
//     }
//   ];

//   return (
//     <section className="min-h-screen py-24 bg-gray-50 flex items-center justify-center">
//       <div className="container mx-auto px-6 lg:px-16">
//         {/* Section Heading */}
//         <div className="w-[90vw] mx-auto text-center mb-20 flex flex-col items-center justify-center gap-6">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
//                 Intelligent Features for{" "}
//                 <span className="text-blue-600">Better Matching</span>
//             </h2>
//             <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl py-12">
//                 Our AI-driven platform combines cutting-edge technology with social responsibility 
//                 to create the most effective internship matching system.
//             </p>
//         </div>


//         {/* Features Grid */}
//         <div className="min-h-screen w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-10 py-20">
//   {features.map((feature, index) => (
//     <Card
//       key={index}
//       className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 border border-gray-100 "
//     >
//       {/* Card Header */}
//       <CardHeader className="pb-2">
//         <div className="flex items-center gap-4 mb-3">
//           <div className=" rounded-xl bg-blue-50 text-blue-600 shadow-sm">
//             <feature.icon className="h-7 w-7" />
//           </div>
//           <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
//             {feature.title}
//           </CardTitle>
//         </div>
//         <CardDescription className="text-base text-gray-600 leading-relaxed">
//           {feature.description}
//         </CardDescription>
//       </CardHeader>

//       {/* Card Content */}
//       <CardContent className="">
//         <div className="flex flex-wrap gap-2 mt-3">
//           {feature.tags.map((tag, tagIndex) => (
//             <Badge
//               key={tagIndex}
//               variant="secondary"
//               className="text-xs  rounded-full bg-gray-100 text-gray-700"
//             >
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   ))}
// </div>


//         {/* Additional Benefits */}
//         <div className="mt-24 text-center">
//           <h3 className="text-2xl font-bold mb-12 text-gray-900">
//             Why Choose Our Platform?
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//             {[
//               { icon: Zap, label: "Lightning Fast", desc: "Instant matching results" },
//               { icon: CheckCircle, label: "99% Success Rate", desc: "Proven track record" },
//               { icon: Users, label: "10K+ Placements", desc: "Growing community" },
//               { icon: Shield, label: "Secure & Private", desc: "Data protection first" }
//             ].map((benefit, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
//               >
//                 <div className="p-3 mb-3 rounded-full bg-blue-50 text-blue-600">
//                   <benefit.icon className="h-8 w-8" />
//                 </div>
//                 <div className="font-semibold text-gray-900 text-lg">
//                   {benefit.label}
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">
//                   {benefit.desc}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Feature;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.jsx";
import { Badge } from "../ui/badge.jsx";
import { Brain, MapPin, Users, BarChart3, Shield, Clock, Zap, CheckCircle } from "lucide-react";
import "./Home.css"; 

const Feature = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description:
        "Advanced machine learning algorithms analyze skills, qualifications, and preferences to find the perfect internship match.",
      tags: ["Machine Learning", "Smart Algorithms"],
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description:
        "Considers geographical preferences, rural representation, and aspirational districts for inclusive placement opportunities.",
      tags: ["Geographic Matching", "Inclusive Access"],
    },
    {
      icon: Users,
      title: "Affirmative Action Support",
      description:
        "Ensures fair representation across social categories, rural areas, and different demographic groups.",
      tags: ["Diversity", "Equal Opportunity"],
    },
    {
      icon: BarChart3,
      title: "Capacity Optimization",
      description:
        "Intelligently manages internship capacity across industries to maximize placement opportunities.",
      tags: ["Resource Management", "Optimization"],
    },
    {
      icon: Shield,
      title: "Merit & Equity Balance",
      description:
        "Balances merit-based selection with affirmative action requirements for fair and effective placements.",
      tags: ["Fair Selection", "Balanced Approach"],
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description:
        "Processes thousands of applications efficiently, reducing placement delays and improving user experience.",
      tags: ["Fast Processing", "Scalability"],
    },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {/* Section Heading */}
        <div className="features-heading">
          <h2>
            Intelligent Features for{" "}
            <span className="highlight">Better Matching</span>
          </h2>
          <p>
            Our AI-driven platform combines cutting-edge technology with social
            responsibility to create the most effective internship matching
            system.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <CardHeader className="feature-card-header">
                <div className="feature-card-title">
                  <div className="feature-icon">
                    <feature.icon className="icon" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="feature-tags">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} className="feature-badge">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="benefits">
          <h3>Why Choose Our{" "} <span className="highlight"> Platform</span> ?</h3>
          <div className="benefits-grid">
            {[
              { icon: Zap, label: "Lightning Fast", desc: "Instant matching results" },
              { icon: CheckCircle, label: "99% Success Rate", desc: "Proven track record" },
              { icon: Users, label: "10K+ Placements", desc: "Growing community" },
              { icon: Shield, label: "Secure & Private", desc: "Data protection first" },
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">
                  <benefit.icon className="icon" />
                </div>
                <div className="benefit-label">{benefit.label}</div>
                <div className="benefit-desc">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
