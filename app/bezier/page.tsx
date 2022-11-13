import { NextPage } from "next";
import { BezierDemo } from "../../component/BezierDemo";

const Page: NextPage = () => (
    <BezierDemo
        options={{
            enableStroke: false
            // enableBezierPoints: false
        }}
    />
)

export default Page