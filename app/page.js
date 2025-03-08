"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import Fraction from "fraction.js";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const [a1, seta1] = useState('');
  const [b1, setb1] = useState('');
  const [c1, setc1] = useState('');
  const [a2, seta2] = useState('');
  const [b2, setb2] = useState('');
  const [c2, setc2] = useState('');
  const [x, setx] = useState('');
  const [y, sety] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const convertToFraction = (decimal) => {
    const fraction = new Fraction(decimal);
    const sign = fraction.s < 0 ? "-" : "";
    return `${sign}${fraction.n.toString()}/${fraction.d.toString()}`; // Convert BigInt to String
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setx('');
    sety('');
    setIsLoading(true)
    try {
      const A1 = Number(a1);
      const B1 = Number(b1);
      const C1 = Number(c1);
      const A2 = Number(a2);
      const B2 = Number(b2);
      const C2 = Number(c2);

      const Determinant = A1 * B2 - A2 * B1;

      if (Determinant === 0) {
        alert("Infinitive Solutions");
      }

      const DX = C2 * B1 - C1 * B2;
      const X = DX / Determinant;
      const franctionaziedX = convertToFraction(X);
      setx(franctionaziedX);

      const DY = C1 * A2 - C2 * A1;
      const Y = DY / Determinant;

      const franctionaziedY = convertToFraction(Y);
      sety(franctionaziedY);

      setTimeout(() => {
        console.log("setting false")
        setIsLoading(false);
      }, 2000)
    } catch (err) {
      console.log(err);

      setIsLoading(false);
      alert("My bad bro! Seems something went wrong.")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl p-8 shadow-md shadow-gray-300 min-h-[500px] min-w-[80%] mx-auto md:min-w-[500px]">
          <h1 className="text-2xl ">Formula AB</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full mt-4">
            <div className="flex gap-x-2 gap-y-4 flex-col md:flex-row">
              <div className="w-full md:w-1/2 ">
                <div className="flex flex-col gap-y-1 w-full">
                  <h3>Equation: </h3>
                  <p>
                    a<sub>1</sub>x + b<sub>1</sub>y + c<sub>1</sub> = 0
                  </p>
                  <p>
                    a<sub>2</sub>x + b<sub>2</sub>y + c<sub>2</sub> = 0
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 ">
                <div className="flex flex-col gap-y-1 w-full">
                  <h3>Demo: </h3>
                  <p>
                    5x + 3y + 1 = 0
                  </p>
                  <p>
                    7x + 2y + 3 = 0
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-2">
              <Input type="number" placeholder="a1" className="w-fit max-w-16 text-black" value={a1} onChange={e => seta1(e.target.value)} />
              X
              <span className="font-semibold">+</span>
              <Input type="number" placeholder="b1" className="w-fit max-w-16 text-black" value={b1} onChange={e => setb1(e.target.value)} />
              Y
              <span className="font-semibold">+</span>
              <Input type="number" placeholder="c1" className="w-fit max-w-16 text-black" value={c1} onChange={e => setc1(e.target.value)} />
              <span className="font-semibold">=</span>
              0
            </div>

            <div className="flex items-center gap-x-2">
              <Input type="number" placeholder="a2" className="w-fit max-w-16 text-black" value={a2} onChange={e => seta2(e.target.value)} />
              X
              <span className="font-semibold">+</span>
              <Input type="number" placeholder="b2" className="w-fit max-w-16 text-black" value={b2} onChange={e => setb2(e.target.value)} />
              Y
              <span className="font-semibold">+</span>
              <Input type="number" placeholder="c2" className="w-fit max-w-16 text-black" value={c2} onChange={e => setc2(e.target.value)} />
              <span className="font-semibold">=</span>
              0
            </div>

            <Button type="submit" disabled={isLoading} variant={"none"} className={"bg-[#222222] hover:bg-neutral-700 text-white w-full cursor-pointer transition-all duration-200 ease-in-out"}>
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Solve"}
            </Button>
          </form>

          <div className="mt-4">
            <h3>Result: </h3>
            {
              (!isLoading && x && y)&& (
                <>
                  <div className="bg-[#ECECEC] text-black font-semibold w-full rounded-md px-4 py-2 text-sm">
                    X = {x}
                  </div>
                  <div className="bg-[#ECECEC] text-black font-semibold w-full rounded-md px-4 py-2 text-sm mt-2">
                    Y = {y}
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
