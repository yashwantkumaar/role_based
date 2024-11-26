const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
  };
  window.addEventListener("resize", handleResize);
  handleResize();
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    &:hover {
      background-color: #440080;
    }
  }
`;
