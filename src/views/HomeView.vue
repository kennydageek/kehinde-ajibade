<script setup>
import ExperienceCard from '@/components/ExperienceCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import Dwayremit from '@/assets/dwayremit.png';
import Realvest from '@/assets/realvest.png';
import Greenland from '@/assets/greenland.png';
import Settlequick from '@/assets/settlequick.png';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cursorX = ref(0);
const cursorY = ref(0);

const updateMousePosition = (e) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
};

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', updateMousePosition);
});

const setActive = (event) => {
  const links = document.querySelectorAll('nav a');
  links.forEach((link) => link.classList.remove('active'));
  event.currentTarget.classList.add('active');
};

const tools = [
  'Javascript',
  'Vue JS',
  'Nuxt',
  'React.js',
  'Next.js',
  'Jest',
  'Vue-test-utils',
  'Sanity',
  'Notion',
  'Postman',
  'Swagger',
  'Git',
];

const items = [
  {
    time: '2022 - PRESENT',
    title: 'Frontend Engineer, Pertinence Group',
    para: [
      `Spearheaded the complete frontend architecture of Realvest 5.0, focusing on meticulous design patterns`,
      `I Utilized Jest and Vue-test-utils for rigorous unit testing, ensuring the reliability and stability of the Realvest
application.`,
      `Compilation Realvest 5.0 into a mobile app for Android and IOS using capacitor.js`,
      `I added blogging functionality with sanity to the platform`,
    ],
    stack: ['Vue', 'Vue-test-utils', 'Jest', 'Tailwind', 'Git'],
    link: 'https://realvest.ng',
  },

  {
    time: 'July 2023 - Present',
    title: 'Software Engineer, Dwayremit (freelance)',
    para: [
      `I Ensured the functionality of the web app (customer side), admin, and payment links, ensuring seamless
user experience and operational reliability`,
      `I Integrated various payment gateways, enhancing the app&#39;s ability to process transactions smoothly.`,
      `Developed a JavaScript SDK that empowered small businesses to use Dwayremit as a payment processor,
broadening the app's market reach`,
      `Designed and implemented a compliance module, enabling enforcement of compliance on customers,
and transactions. this helped to curb money laundering.`,
    ],
    stack: ['Vue', 'vue-test-utils', 'Jest'],
    link: 'https://dwayremit.com/app',
  },
];

const projects = [
  {
    title: 'Dwayremit',
    link: 'https://dwayremit.com/login',
    desc: `A fintech app that makes international money transfers easier than ever. Enjoy quick, easy money transfers with competitive exchange rates and low fees.`,
    img: Dwayremit,
  },

  {
    title: 'Realvest',
    link: 'https://realvest.ng',
    desc: `With Realvest, you can explore and select from top-notch plans that align with your vision, bringing you closer to the home you've always desired.`,
    img: Realvest,
  },

  {
    title: 'Greenland',
    link: 'https://greenlandcooperative.com/',
    desc: `Greenland makes investment in Africa's development possible by consolidating the financial capacity and asset base of members of our society.`,
    img: Greenland,
  },

  {
    title: 'Settlequick',
    link: 'https://settlequick.ca/',
    desc: `Settlequick is built to help people get fully integrated into their new local community by linking them up with trusted service providers.`,
    img: Settlequick,
  },
];
</script>

<template>
  <main
    class="bg-[#101B38] h-[100vh] relative overflow-hidden md:overflow-scroll"
  >
    <div
      class="cursor-effect absolute rounded-full pointer-events-none"
      :style="{ top: cursorY + 'px', left: cursorX + 'px' }"
    ></div>

    <div
      class="flex justify-between flex-col lg:flex-row px-6 py-12 lg:gap-4 lg:w-[75%] mx-auto"
    >
      <header
        class="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24"
      >
        <div class="">
          <h1 class="heading text-3xl font-semibold text-slate-200 sm:text-5xl">
            Kehinde Ajibade
          </h1>
          <h2 class="mt-3 text-lg tracking-tight text-slate-200 sm:text-xl">
            Frontend Engineer
          </h2>

          <p class="mt-4 max-w-xs font-light text-slate-400 leading-normal">
            ...Crafting performant webapps like a boss
          </p>
          <nav class="mt-16 hidden lg:block text-white">
            <ul class="mt-16 w-max">
              <li>
                <a
                  class="group flex items-center py-3 active"
                  href="#about"
                  @click="setActive($event)"
                  ><span
                    class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
                  ></span
                  ><span
                    class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                    >About</span
                  ></a
                >
              </li>
              <li>
                <a
                  class="group flex items-center py-3"
                  href="#experience"
                  @click="setActive($event)"
                  ><span
                    class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
                  ></span
                  ><span
                    class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                    >Experience</span
                  ></a
                >
              </li>
              <li>
                <a
                  class="group flex items-center py-3"
                  href="#projects"
                  @click="setActive($event)"
                  ><span
                    class="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
                  ></span
                  ><span
                    class="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                    >Projects</span
                  ></a
                >
              </li>
            </ul>
          </nav>
        </div>

        <ul class="ml-1 mt-8 flex items-center" aria-label="Social media">
          <li class="mr-5 text-xs shrink-0">
            <a
              class="block text-slate-400 hover:text-slate-200"
              href="https://github.com/kennydageek"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub (opens in a new tab)"
              title="GitHub"
              ><span class="sr-only">GitHub</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path></svg
            ></a>
          </li>
          <li class="mr-5 text-xs shrink-0">
            <a
              class="block text-slate-400 hover:text-slate-200"
              href="https://www.linkedin.com/in/kehinde-ajibade/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn (opens in a new tab)"
              title="LinkedIn"
              ><span class="sr-only">LinkedIn</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                ></path></svg
            ></a>
          </li>

          <!-- <li class="mr-5 text-xs shrink-0">
            <a
              class="block text-slate-400 hover:text-slate-200"
              href=" https://x.com/michaeltolu77"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Twitter (opens in a new tab)"
              title="Twitter"
              ><span class="sr-only">Twitter</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                fill="none"
                class="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  fill="currentColor"
                ></path></svg
            ></a>
          </li> -->
        </ul>
      </header>

      <div class="text-white pt-24 lg:w-[45%] lg:py-24 grow">
        <section
          id="about"
          class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="About me"
        >
          <div
            class="sticky top-0 z-20 -mx-6 mb-4 w-screen lg:bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
          >
            <h2
              class="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only"
            >
              About
            </h2>
          </div>
          <div>
            <p
              class="mb-4 text-slate-400 font-light leading-[1.625] text-[16.5px] text-justify"
            >
              A software engineer with 3+ years of working experience. A Tech
              enthusiast who chooses to be a self-taught software engineer with
              passion for solving challenging problems and building products
              that make an impact in people’s lives. I started my career with
              internships, a couple of personal projects and freelance work.
            </p>
            <p class="mb-4 font-light text-justify">
              I have Proven track record of delivering high-quality, scalable,
              and visually appealing web applications. Adept at translating
              design concepts into efficient and responsive user interfaces.
              Collaborative team player with excellent communication skills,
              able to work seamlessly with cross-functional teams to achieve
              project goals. I am committed to continuous
              <!-- <a
                class="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://www.klaviyo.com/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Klaviyo (opens in a new tab)"
                >Klaviyo</a
              >. I most enjoy building software in the sweet spot where design
              and engineering meet — things that look good but are also built
              well under the hood. In my free time, I've also released an
              <a
                class="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                href="https://www.newline.co/courses/build-a-spotify-connected-app"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="online video course (opens in a new tab)"
                >online video course</a
              >
              that covers everything you need to know to build a web app with
              the Spotify API.
            </p>
            <p
              class="mb-4 text-slate-400 font-light leading-[1.625] text-[16.5px]"
            >
              When I’m not at the computer, I’m usually rock climbing, reading,
              hanging out with my wife and two cats, or running around Hyrule
              searching for
              <span
                class="group/korok inline-flex lg:cursor-[url('/images/koroks/Elma.png'),_pointer] lg:font-medium lg:text-slate-200"
                ><span class="sr-only">Korok seeds</span
                ><span
                  class="group-hover/korok:text-red-400 transition duration-75 group-hover/korok:-translate-y-px delay-[50ms]"
                  aria-hidden="true"
                  >K</span
                ><span
                  class="group-hover/korok:text-orange-400 transition duration-75 group-hover/korok:-translate-y-px delay-[75ms]"
                  aria-hidden="true"
                  >o</span
                ><span
                  class="group-hover/korok:text-yellow-400 transition duration-75 group-hover/korok:-translate-y-px delay-[100ms]"
                  aria-hidden="true"
                  >r</span
                ><span
                  class="group-hover/korok:text-lime-400 transition duration-75 group-hover/korok:-translate-y-px delay-[125ms]"
                  aria-hidden="true"
                  >o</span
                ><span
                  class="group-hover/korok:text-green-400 transition duration-75 group-hover/korok:-translate-y-px delay-[150ms]"
                  aria-hidden="true"
                  >k</span
                ><span
                  class="group-hover/korok:text-teal-400 transition duration-75 group-hover/korok:-translate-y-px delay-[175ms]"
                  aria-hidden="true"
                  >&nbsp;</span
                ><span
                  class="group-hover/korok:text-cyan-400 transition duration-75 group-hover/korok:-translate-y-px delay-[200ms]"
                  aria-hidden="true"
                  >s</span
                ><span
                  class="group-hover/korok:text-sky-400 transition duration-75 group-hover/korok:-translate-y-px delay-[225ms]"
                  aria-hidden="true"
                  >e</span
                ><span
                  class="group-hover/korok:text-blue-400 transition duration-75 group-hover/korok:-translate-y-px delay-[250ms]"
                  aria-hidden="true"
                  >e</span
                ><span
                  class="group-hover/korok:text-indigo-400 transition duration-75 group-hover/korok:-translate-y-px delay-[275ms]"
                  aria-hidden="true"
                  >d</span
                ><span
                  class="group-hover/korok:text-violet-400 transition duration-75 group-hover/korok:-translate-y-px delay-[300ms]"
                  aria-hidden="true"
                  >s</span
                ></span
              >. -->
              <!-- </p> -->
            </p>
          </div>
        </section>

        <section
          id="experience"
          class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        >
          <div
            class="sticky top-0 z-20 -mx-6 mb-4 w-screen lg:bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
          >
            <h2
              class="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only"
            >
              Experience
            </h2>
          </div>
          <div>
            <ol class="group/list">
              <experience-card
                :item="item"
                v-for="(item, i) in items"
                :key="`item-${i}`"
              />
            </ol>
          </div>
          <div class="mt-12">
            <a
              class="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 font-semibold text-slate-200 group/link text-base"
              href="https://docs.google.com/document/d/1Y9F9Iai7DokAnQD5lKgYpUqlGNWxlaGe/edit?usp=sharing&ouid=118221678728797764707&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="View Full Résumé (opens in a new tab)"
              ><span
                >View Full
                <span class="inline-block"
                  >Résumé<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clip-rule="evenodd"
                    ></path></svg></span></span
            ></a>
          </div>
        </section>

        <section
          id="tools"
          class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
        >
          <div
            class="sticky top-0 z-20 -mx-6 mb-4 w-screen lg:bg-transparent sm:bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0"
          >
            <h2
              class="text-sm font-bold uppercase tracking-widest text-slate-200"
            >
              Languages, Frameworks and Tools
            </h2>
          </div>
          <ul class="mt-2 flex flex-wrap" aria-label="Technologies used">
            <li class="mr-1.5 mt-2" v-for="(i, j) in tools" :key="`stack-${j}`">
              <div
                class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
              >
                {{ i }}
              </div>
            </li>
          </ul>
        </section>

        <section
          id="projects"
          class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
          aria-label="Selected projects"
        >
          <div
            class="sticky top-0 z-20 -mx-6 mb-4 w-screen lg:bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
          >
            <h2
              class="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only"
            >
              Projects
            </h2>
          </div>
          <div>
            <ul class="group/list">
              <project-card
                v-for="(project, i) in projects"
                :key="`project-${i}`"
                :item="project"
              />
            </ul>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
<style scoped>
.cursor-effect {
  width: 1024px;
  height: 1024px;
  background: radial-gradient(
    600px at 555px 244px,
    rgba(29, 78, 216, 0.15),
    transparent 80%
  );
  transform: translate(-50%, -50%);
  transition: background-color 0.2s ease-out;
  will-change: top, left;
}

.nav-indicator {
  transition: all 0.2s;
}

.nav-text {
  transition: color 0.2s;
}

/* Apply hover and active state styles */
.group:hover .nav-indicator,
.group:focus .nav-indicator,
.active .nav-indicator {
  width: 64px;
  background-color: #e2e8f0; /* bg-slate-200 */
}

.group:hover .nav-text,
.group:focus .nav-text,
.active .nav-text {
  color: #e2e8f0; /* text-slate-200 */
}
</style>
