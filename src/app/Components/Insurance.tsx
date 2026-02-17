import React from 'react'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'
import Image from 'next/image'


const content=[
    {
            title:" Why is Insurance Important?",
            description:
            " Insurance provides financial security and peace of mind by covering costs that might otherwise cause significant financial strain. It ensures stability in times of crisis, helping policyholders manage risks effectively without depleting their savings. Whether it’s a medical emergency, an accident, or damage to property, insurance serves as a crucial tool in long-term financial planning.",
            content:(
    <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src="/insurance.jpg"
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
            ),
        },
        {
                title:"How Does Insurance Work?",
                description:
                "Insurance operates on a risk-pooling system, where many policyholders contribute small amounts (premiums) to a common fund. When a covered event occurs, the insurer compensates the policyholder based on the policy terms. The amount of coverage, premium cost, and claim process vary depending on the type of policy chosen.",
                content:(
        <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                  src="/insurance2.jpg"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  alt="linear board demo"
                />
              </div>
                ),
            },
            {
                    title:" Business Insurance: Securing Enterprises Against Risks",
                    description:
                    " Businesses face multiple risks, from operational disruptions to legal liabilities. Business insurance helps protect against financial losses due to property damage, lawsuits, cyber threats, or employee-related risks. A well-structured policy ensures business continuity and financial stability.",
                    content:(
            <div className="h-full w-full  flex items-center justify-center text-white">
                    <Image
                      src="/insurance3.jpg"
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                      alt="linear board demo"
                    />
                  </div>
                    ),
                },
                {
                        title:" The Role of Insurance in Financial Planning",
                        description:
                        "Insurance is not just about protection—it is an essential part of wealth management. Some policies, such as life insurance with investment benefits, help in wealth accumulation. Tax benefits on insurance premiums further contribute to effective financial planning. Integrating insurance with savings and investments ensures a well-rounded financial portfolio.",
                        content:(
                <div className="h-full w-full  flex items-center justify-center text-white">
                        <Image
                          src="/insurance1.jpg"
                          width={300}
                          height={300}
                          className="h-full w-full object-cover"
                          alt="linear board demo"
                        />
                      </div>
                        ),
                    },
]

const Insurance = () => {
  return (
    <div className='container mx-auto'>
          <div className='container mx-auto '>
                <div className=" bg-[url(/background1.jpeg)] bg-no-repeat bg-cover relative bg-fixed ">
                  <div>
                  <h1 className="text-bold md:text-6xl py-4">Insurance</h1>
                  <div className="md:max-w-[650px] w-full py-3">
                  <p className="text-gray-700 text-lg leading-tight">
                  Insurance is a financial safety net that protects individuals and businesses from unexpected losses. It functions on the principle of risk-sharing, where a policyholder pays a premium to an insurance company in exchange for financial coverage against unforeseen events like accidents, health issues, property damage, or legal liabilities.
                        </p></div>
                  </div>
                  <div className="p-10 text-black  w-full py-4">
                  <div className=" inset-0 bg-black/30"></div> 
                  <StickyScroll content={content} contentClassName="" />
                </div>
                </div>
              </div>
        </div>
    
  )
}

export default Insurance
