"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
// const DomainSliderLayout = ({ data }: { data: any }) => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     // autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     swipeToSlide: true,
//     arrows: false,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 420,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 0,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="w-full">
//         <Slider {...settings}>
//           {data
//             ?.filter((d: any) => d?.image)
//             .map((d: any, i: number) => {
//               return (
//                 <div className="w-full "
//                 key={i}>
//                   <Link
//                     href={`https://${d?.customDomain ? d.customDomain : "#"}`}
//                     target="_blank"
//                     className="relative flex h-[100px] w-[250px]  justify-center rounded-lg px-1"
//                   >
//                     <img
//                       src={d?.image || "/slider_1.jpg"}
//                       alt=""
//                       className="h-full w-full object-cover opacity-[0.4]"
//                     />
//                     <div className="absolute flex flex-col justify-center p-[0.8rem]  text-white ">

//                     <p className="text-2xl font-semibold">
//                         {d?.customDomain}
//                     </p>

//                       <p className="w-48 truncate text-sm ">
//                         {d?.description || d?.customDomain}
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               );
//             })}
//         </Slider>
//       </div>

//       {/* <div className="w-full">
//         <Slider {...settings}>
//           {data
//             ?.filter((d: any) => d?.image)
//             .map((d: any, i: number) => {
//               return (
//                 // <div className="">
//                 // <div key={i} style={{
//                 //   backgroundImage:`url('${d?.image}')`
//                 // }} className="flex h-[100px] w-[250px] items-center justify-center bg-auto bg-no-repeat  object-cover opacity-[0.4]">
//                 //   <div className="ml-3 mt-3 flex flex-col">
//                 //     <p className="text-2xl font-semibold text-slate-50">
//                 //       {d?.customDomain}
//                 //     </p>
//                 //     <p className="line-clamp-2 w-36  text-sm text-slate-50 sm:w-44">
//                 //       {d?.description || d?.customDomain}
//                 //     </p>
//                 //   </div>
//                 // </div>
//                 // </div>




//                 <div className="relative block h-[150px]  border border-gray-400 overflow-hidden rounded-md ">
//                    <a
//                      className=""
//                      target="_blank"
//                      href={`https://${d?.customDomain ? d.customDomain : "#"}`}
//                    >
//                      <img
//                        className="absolute w-full object-cover opacity-[0.4]"
//                        src={d?.image || "/slider_1.jpg"}
//                      />
//                      <div className="relative mx-[1rem] my-[1.8rem] flex flex-col">
//                        <p className="text-2xl font-semibold text-slate-50">
//                          {d?.customDomain}
//                        </p>
//                        <p className="line-clamp-2 w-36  text-sm text-slate-50 sm:w-44">
//                          {d?.description || d?.customDomain}
//                        </p>
//                      </div>
//                    </a>
//                  </div>
//               );
//             })}
//         </Slider>
//       </div> */}
//     </>
//   );
// };

const DomainSliderLayout = ({ data }: { data: any }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {data
          ?.filter((d: any) => d?.image)
          .map((d: any, i: number) => {
            return (
              <div className="w-full " key={i}>
                <Link
                  href={`https://${d?.customDomain ? d.customDomain : "#"}`}
                  target="_blank"
                  className="relative flex justify-center rounded-lg px-1 "
                >
                  <img
                    src={d?.image || "/slider_1.jpg"}
                    alt=""
                    className="w-full object-cover h-auto opacity-40"
                    style={{ maxHeight: "100px" }}
                  />
                  <div className="absolute flex flex-col justify-center p-2 text-white">
                    <p className="text-xl font-semibold">
                      {d?.customDomain}
                    </p>
                    <p className="w-48 line-clamp-2 text-sm">
                      {d?.description || d?.customDomain}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default DomainSliderLayout;
