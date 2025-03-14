const reload = () => window.location.reload;

export const ErrorPage = () => (
  <>
    <div className="error-page-wrapper">
      <div className="error-page-inner-wrapper">
        <p>An error occured</p>
        <button onClick={reload} className="error-page-button">
          Reload
        </button>
      </div>
    </div>
  </>
);
