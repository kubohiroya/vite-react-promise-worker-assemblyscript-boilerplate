import React, {
  ReactNode,
  useState,
} from "react";
import { PreloadImageObjectContextProvider } from "./usePreloadImageObject";
import { ImageFilterBenchmark } from "./ImageFilterBenchmark";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import project from "../../package.json";

import { ImageViewer } from "./ImageViewer";
import { JSImageProcessor } from "./js/JSImageProcessor";
import { ASImageProcessor } from "./as/ASImageProcessor";
import { WebGPUDeviceContextProvider } from "./gpu/useWebGPUDevice";
import { WebGPUImageFilterBenchmark } from "./gpu/WebGPUImageFilterBenchmark";
import DigitalClock from "../components/DigitalClock";
import { useAtom } from "jotai";
import { activeCountAtom } from "./atoms";

const IMAGE_SOURCE_URL = project.name+'/The_Great_Wave_off_Kanagawa.jpg';
const COUNT = 200;

const jsImageProcessor = new JSImageProcessor();

const jsImageWorkerProcessor = new ComlinkWorker<JSImageProcessor>(
  new URL("./js/JSImageProcessor", import.meta.url),
  {
    type: "module",
  },
);

const asImageWorkerProcessor = new ComlinkWorker<ASImageProcessor>(
  new URL("./as/ASImageProcessor", import.meta.url),
  {
    type: "module",
  },
);

const ImageFilterContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Grid container spacing={2} height={290}>
      <Grid
        container
        size={{ xs: 2 }}
        alignContent={"center"}
        justifyContent={"end"}
      >
        <Typography fontSize={20}>{title}</Typography>
      </Grid>
      {React.Children.map(children, (child) => (
        <Grid
          container
          size={{ xs: 5 }}
          alignContent={"center"}
          justifyContent={"center"}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export const App = () => {
  const [count, setCount] = useState<number>(COUNT);
  const [activeCount] = useAtom(activeCountAtom);

  if(new URLSearchParams(location.search).get("mode") === "clock"){
    return <DigitalClock />
  }

  return (
    <PreloadImageObjectContextProvider
      src={IMAGE_SOURCE_URL}
      loader={<CircularProgress />}
    >
      <Stack direction={"column"}>
        <DigitalClock />
        <LinearProgress variant="indeterminate" />
        <ImageViewer scale={1} height={100} dy={-440} />
        <Box style={{ margin: "35px 100px 30px 100px" }}>
          <Slider
            defaultValue={COUNT}
            disabled={activeCount !== 0}
            value={count}
            onChange={(_: any, value: number | number[]) =>
              setCount(value as number)
            }
            min={0}
            max={500}
            step={10}
            valueLabelDisplay="on"
            marks={[
              { value: 0, label: "0" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
              { value: 200, label: "200" },
              { value: 300, label: "300" },
              { value: 400, label: "400" },
              { value: 500, label: "500" },
            ]}
          />
        </Box>

        <ImageFilterContainer title={"JavaScript"}>
          <ImageFilterBenchmark
            title={"JavaScript"}
            iteration={count}
            processor={jsImageProcessor}
            options={{ isWorker: false }}
          />
          <ImageFilterBenchmark
            title={"JavaScript with WebWorker"}
            iteration={count}
            processor={jsImageWorkerProcessor}
            options={{ isWorker: true }}
          />
        </ImageFilterContainer>

        <ImageFilterContainer title={"AssemblyScript"}>
          <ImageFilterBenchmark
            title={"AssemblyScript"}
            iteration={count}
            processor={new ASImageProcessor()}
            options={{ isWorker: false }}
          />
          <ImageFilterBenchmark
            title={"AssemblyScript with WebWorker"}
            iteration={count}
            processor={asImageWorkerProcessor}
            options={{ isWorker: true }}
          />
        </ImageFilterContainer>

          {false &&
        <ImageFilterContainer title={"AssemblyScript(SIMD)"}>
          <ImageFilterBenchmark
            title={"AssemblyScript(SIMD)"}
            iteration={count}
            processor={new ASImageProcessor()}
            options={{ isWorker: false, simd: true }}
          />
          <ImageFilterBenchmark
            title={"AssemblyScript(SIMD) with WebWorker"}
            iteration={count}
            processor={asImageWorkerProcessor}
            options={{ isWorker: true, simd: true }}
          />
        </ImageFilterContainer>
          }

        <WebGPUDeviceContextProvider
          loadingMessage={<CircularProgress />}
          notSupportedMessage={<Typography>WebGPU is not supported</Typography>}
        >
          <ImageFilterContainer title={"WebGPU"}>
            <WebGPUImageFilterBenchmark
              title={"WebGPU Compute Shader"}
              iteration={count}
              options={{ isWorker: false }}
            />
          </ImageFilterContainer>
        </WebGPUDeviceContextProvider>
      </Stack>
    </PreloadImageObjectContextProvider>
  );
};

export default App;