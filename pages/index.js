/* eslint-disable */
import Head from "next/head"
import { useEffect } from "react"
import Header from "../components/Header"

import AOS from 'aos'
import 'aos/dist/aos.css'
const Home=()=> {
  useEffect(() => {
    AOS.init({
      once: false,
      offset: 50,
    });
  }, []);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header minHeight="min-h-screen">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">This is a website make for person with cerebral palsy. Our goals is help them become normal.</p>
      </Header>
      <section className="mt-10">
        <article className="py-3 container mx-auto lg:px-10">

          <article className="mb-12 flex flex-wrap">
              <div className="w-full lg:w-2/6 flex justify-center items-center lg:mb-0 mb-4">
                <img src="/_assets/image/whatiscp.jpg" width={500} className="rounded-md" data-aos="fade-right"/>
              </div>
            <div className="w-full lg:w-4/6 px-6 md:px-10">
              <h1 className="text-4xl font-bold pb-4 text-primary">What is Cerebral Palsy</h1>
              <div className="divider"></div> 
              <p >Cerebral palsy (CP) is a group of disorders that affect a person’s ability to move and maintain balance and posture. CP is the most common motor disability in childhood. Cerebral means having to do with the brain. Palsy means weakness or problems with using the muscles. CP is caused by abnormal brain development or damage to the developing brain that affects a person’s ability to control his or her muscles.<br/><br/>
                The symptoms of CP vary from person to person. A person with severe CP might need to use special equipment to be able to walk, or might not be able to walk at all and might need lifelong care. A person with mild CP, on the other hand, might walk a little awkwardly, but might not need any special help. CP does not get worse over time, though the exact symptoms can change over a person’s lifetime.</p>
            </div>
          </article>

          <article className="mb-12 px-6 md:px-0">
            <h1 className="text-4xl font-bold text-center pb-4 text-primary mb-3 divider">Type of Cerebral Palsy</h1>
            <p>
              
            </p>
            <div className="cardBox grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="card card-side bg-base-100 shadow-xl col-span-2 flex-wrap lg:flex-none "  data-aos="fade-up">
                <div className="card-body w-full">
                  <h2 className="card-title">Spastic Cerebral Palsy</h2>
                  <p>Spastic cerebral palsy is the most common type of cerebral palsy. The muscles of people with spastic cerebral palsy feel stiff and their movements may look stiff and jerky. <br /><br />

Spasticity is a form of hypertonia, or increased muscle tone. This results in stiff muscles which can make movement difficult or even impossible.</p>
                  <div className="card-actions justify-end">
                    <a className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>

              <div className="card card-side bg-base-100 shadow-xl col-span-2 flex-wrap lg:flex-none" data-aos="fade-up">
                <div className="card-body w-full ">
                  <h2 className="card-title">Dyskinetic Cerebral Palsy</h2>
                  <p>People with dyskinetic CP have problems controlling the movement of their hands, arms, feet, and legs, making it difficult to sit and walk. The movements are uncontrollable and can be slow and writhing or rapid and jerky. Sometimes the face and tongue are affected and the person has a hard time sucking, swallowing, and talking. A person with dyskinetic CP has muscle tone that can change (varying from too tight to too loose) not only from day to day, but even during a single day.</p>
                  <div className="card-actions justify-end">
                    <a className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>

              <div className="card card-side bg-base-100 shadow-xl col-span-2 flex-wrap lg:flex-none" data-aos="fade-up">
                <div className="card-body w-full ">
                  <h2 className="card-title">Ataxic Cerebral Palsy</h2>
                  <p>People with ataxic CP have problems with balance and coordination. They might be unsteady when they walk. They might have a hard time with quick movements or movements that need a lot of control, like writing. They might have a hard time controlling their hands or arms when they reach for something.</p>
                  <div className="card-actions justify-end">
                    <a className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>

              <div className="card card-side bg-base-100 shadow-xl col-span-2 flex-wrap lg:flex-none" data-aos="fade-up">
                <div className="card-body w-full ">
                  <h2 className="card-title">Mixed Cerebral Palsy</h2>
                  <p>Some people have symptoms of more than one type of CP. The most common type of mixed CP is spastic-dyskinetic CP.

</p>
                  <div className="card-actions justify-end">
                    <a className="btn btn-primary">Read More</a>
                  </div>
                </div>
              </div>
              
            </div>


          </article>
            
          <article className="mb-12 px-6 md:px-10">
            <h1 className="text-4xl font-bold text-center pb-4 text-primary mb-3 divider">Early Signs</h1>
            <p className="">The signs of CP vary greatly because there are many different types and levels of disability. The main sign that a child might have CP is a delay reaching motor or movement milestones (such as rolling over, sitting, standing, or walking). It is important to note that some children without CP also might have some of these signs.</p>
            <br />
            <p>Possible signs in a child include:</p>
            <ul className="ml-8 mt-2 gap-2 grid list-disc">
              <li>delays in reaching development milestones – for example, not sitting by 8 months or not walking by 18 months</li>
              <li>seeming too stiff or too floppy</li>
              <li>weak arms or legs</li>
              <li>fidgety, jerky or clumsy movements</li>
              <li>random, uncontrolled movements</li>
              <li>muscle spasms</li>
              <li>shaking hands</li>
              <li>walking on tiptoes</li>
            </ul>
          </article>

          <article className="mb-12 px-6 md:px-10">
            <div className="grid justify-center mt-12">
              <iframe width="720" height="425" className="rounded-xl" src="https://www.youtube.com/embed/MlhgsM1Sbck" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </article>
          
        </article>
      </section>
    </>
  )
}

export default Home