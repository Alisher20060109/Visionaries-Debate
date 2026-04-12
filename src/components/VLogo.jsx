function VLogo({ size = 56 }) {
  return (
    <img
      src="/img/logo.svg"
      alt="Visionaries Logo"
      style={{
        display: "block",
        width: size,
        height: size,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

export default VLogo;