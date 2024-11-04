import { SpinningText } from "./spinning-basic";

export function SpinningTextBasic() {
  return (
    <SpinningText
      radius={5}
      fontSize={1.2}
      className="font-medium leading-none mb-20"
    >
      {`404 Error • 404 Error • 404 Error • `}
    </SpinningText>
  );
}
