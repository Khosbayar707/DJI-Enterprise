import { SiSpinrilla } from 'react-icons/si';

const LoadingText = () => {
  return (
    <div className=" flex items-center gap-2">
      <div>Түр хүлээнэ үү!</div>
      <SiSpinrilla className=" animate-spin" />
    </div>
  );
};

export default LoadingText;
