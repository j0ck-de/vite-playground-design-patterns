// Erstelle ein Modul, um das Skript zu organisieren
const ChangeBodyBgOnScroll = (() => {
  // Definiere Konstanten für die Farben
  const COLORS = ["#FF5733", "#DAF7A6", "#FFC300", "#C70039"];

  // Initialisiere die Hintergrundfarbe mit der ersten Farbe in der Liste
  let currentColorIndex = 0;
  let currentColor = COLORS[currentColorIndex];

  // Definiere eine Funktion, um die Hintergrundfarbe zu aktualisieren
  const updateColor = (newColor) => {
    console.log("Aktualisiere Hintergrundfarbe auf:", newColor);
    document.body.style.backgroundColor = newColor;
  };

  // Definiere eine Funktion, um die nächste Farbe in der Liste zu erhalten
  const getNextColor = (index) => {
    currentColorIndex = index % COLORS.length;
    currentColor = COLORS[currentColorIndex];
    console.log("Nächste Farbe:", currentColor);
    return currentColor;
  };

  // Definiere eine Funktion, um das Skript zu initialisieren
  const init = (time) => {
    console.log("Initialisiere Skript");

    const sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((section, index) => {
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const nextColor = getNextColor(index);
          updateColor(nextColor);
        }
      });
      observer.observe(section);
    });

    // Füge ein Event-Listener hinzu, um die Farben basierend auf der sichtbaren Section zu aktualisieren
    window.addEventListener("scroll", () => {
      const visibleSection = sections.find(
        (section) => section.getBoundingClientRect().top >= 0
      );
      if (visibleSection) {
        document.body.style.transition = `background-color ${time}s ease-in-out`;
        const visibleIndex = sections.indexOf(visibleSection);
        console.log(
          "Sichtbare Section:",
          visibleSection,
          "Index:",
          visibleIndex
        );
        const nextColor = getNextColor(visibleIndex);
        updateColor(nextColor);
      } else {
        document.body.style.transition = "none";
      }
    });
  };

  // Gib das öffentliche API-Objekt zurück
  return {
    init,
  };
})();

export default ChangeBodyBgOnScroll;
