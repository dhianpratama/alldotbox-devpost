// "use client";
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Link from "next/link";


// const DomainSliderLayout = ({ data }: { data: any }) => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     cssEase: "linear",
//     pauseOnHover: true,
//     swipeToSlide: true,
//     arrows: false,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1300,
//         settings: {
//           slidesToShow: 5,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1280,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 820,
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
//         breakpoint: 410,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full">
//       <Slider {...settings}>
//         {data
//           ?.filter((d: any) => d?.image)
//           .map((d: any, i: number) => {
//             return (
//               <div className="w-full " key={i}>
//                 <Link
//                   href={`https://${d?.customDomain ? d.customDomain : "#"}`}
//                   target="_blank"
//                   className="relative flex justify-center rounded-lg px-1 "
//                 >
//                   <img
//                     src={d?.image || "/slider_1.jpg"}
//                     alt=""
//                     className="w-full object-cover h-auto opacity-40"
//                     style={{ maxHeight: "100px" }}
//                   />
//                   <div className="absolute flex flex-col justify-center p-2 text-white">
//                     <p className="text-xl font-semibold">
//                       {d?.customDomain}
//                     </p>
//                     <p className="w-48 line-clamp-2 text-sm">
//                       {d?.description || d?.customDomain}
//                     </p>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </Slider>
//     </div>
//   );
// };

// export default DomainSliderLayout;
