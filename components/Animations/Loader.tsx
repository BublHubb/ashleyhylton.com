import * as loaderAnimation from "./loaderAnimation.json";
import Lottie from "lottie-react";

function Loader() {
  const iconURL =
    "https://firebasestorage.googleapis.com/v0/b/bubl-hubb-2-0.appspot.com/o/App%20Icon%20no%20background.png?alt=media&token=cd09abef-65be-4f23-a528-264d22ea1667";
  return (
    <div className="bg-white flex  h-screen overflow-y-auto justify-center items-center ">
      <Lottie
        animationData={loaderAnimation}
        style={{
          width: 300,
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          margin: 1,
        }}
      />
      <img src={iconURL} className="loaderImageContainer" />
    </div>
  );
}

export default Loader;
