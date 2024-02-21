import "./Donate.css";

const Donate = () => {
  return (
    <div className="container__donate">
      <p>
        Here's my account number:{" "}
        <span className="acc-number">PL39109028350000000146579429</span>.
      </p>
      <p>
        And there is my{" "}
        <a href="https://www.paypal.com/paypalme/megakoks" target="_blank">
          <span className="paypal">PayPal</span>
        </a>
        .
      </p>
      <p className="thx">
        THX FOR MONEY <span className="heart">❤</span>
      </p>
    </div>
  );
};

export default Donate;
