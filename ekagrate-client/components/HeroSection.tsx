async function HeroSection() {
  const { data } = await getGlobalSettings();
  
  return (
    <section className="hero">
      <Button 
        as="a"
        href={`https://wa.me/${data.attributes.whatsapp_number}`}
        className="order-button"
      >
        Place Order via WhatsApp
      </Button>
      {/* Rest of hero section */}
    </section>
  );
} 