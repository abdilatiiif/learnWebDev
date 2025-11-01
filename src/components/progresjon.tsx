import { BookOpen, Award, TrendingUp, LogOut, User, Mail, Lock } from 'lucide-react'

function progresjon() {
  return (
    <div className="pt-25 mx-auto px-10">
      {/** tabs for forskjellige innholdstyper, profil, kjøpt kurs, endring av innstillinger **/}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-teal-500  rounded-2xl text-white  md:h-[150px] p-5">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold"> 0 </div>
              <div className="text-blue-100">Aktive Kurs</div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-700 rounded-2xl text-white md:h-[150px] p-5">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">0%</div>
              <div className="text-emerald-100">Gjennomsnittlig Fremgang</div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500 rounded-2xl text-white md:h-[150px] p-5">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8" />
            <div className="text-right">
              <div className="text-3xl font-bold">0</div>
              <div className="text-orange-100">Fullførte Kurs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default progresjon
