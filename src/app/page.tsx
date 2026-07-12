// import Sidebar from "@/components/layout/Sidebar";
// import Header from "@/components/layout/Header";
// import CurrentWeather from "@/components/weather/CurrentWeather";
// import HourlyForecast from "@/components/weather/HourlyForecast";
// import AQICard from "@/components/cards/AQICard";
// import WindCard from "@/components/cards/WindCard";
// import SunriseCard from "@/components/cards/SunriseCard";
// import UVCard from "@/components/cards/UVCard";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen bg-[#07111F]">

//       <Sidebar />

// <section className="flex-1 p-8 overflow-y-auto">

//   <Header />

//   <div className="grid gap-6 xl:grid-cols-3">

//   <div className="xl:col-span-2">
//     <CurrentWeather />
//   </div>

//   <HourlyForecast />

// </div>
// <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//   <AQICard />
//   <WindCard />
//   <SunriseCard />
//   <UVCard />
// </div>

// </section>

//     </main>
//   );
// }
import Sidebar from "@/components/layout/Sidebar";
import Dashboard from "@/components/layout/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#07111F]">

      <Sidebar />

      <Dashboard />

    </main>
  );
}