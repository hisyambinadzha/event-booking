import BookingForm from "../components/BookingForm";

function BookingPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
          margin: "-40px",
        }}
      >
        <BookingForm />
      </div>
    </>
  );
}

export default BookingPage;
