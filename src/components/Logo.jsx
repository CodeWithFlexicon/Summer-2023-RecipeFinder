import PropTypes from "prop-types";

const Logo = ({ logo }) => {
  Logo.propTypes = {
    logo: PropTypes.string,
  };

  return (
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
      <div className="text-xl font-bold">Simply Craving</div>
    </div>
  );
};

export default Logo;
