import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background:"#07110f",borderRadius:14,border:"3px solid #b9ff66",color:"#b9ff66",fontSize:38,fontWeight:900,fontFamily:"Arial"}}>P</div>,
    size,
  );
}
