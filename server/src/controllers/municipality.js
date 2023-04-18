import Municipality from "../models/Municipality.js";

export const getMunicipalities = async (req, res) => {
  try {
    const municipalities = await Municipality.find();
    res.status(200).json({ success: true, result: municipalities });
  } catch (error) {
    logError(error);
    res.status(500).json({
      success: false,
      msg: "Unable to get municipalities, try again later",
    });
  }
};

export const createAllMunicipalities = async (req, res) => {
  try {
    await Municipality.insertMany([
      { municipalityName: "Beek" },
      { municipalityName: "Beekdaelen" },
      { municipalityName: "Beesel" },
      { municipalityName: "Bergen (L.)" },
      { municipalityName: "Brunssum" },
      { municipalityName: "Echt-Susteren" },
      { municipalityName: "Eijsden-Margraten" },
      { municipalityName: "Gennep" },
      { municipalityName: "Gulpen-Wittem" },
      { municipalityName: "Heerlen" },
      { municipalityName: "Horst aan de Maas" },
      { municipalityName: "Kerkrade" },
      { municipalityName: "Landgraaf" },
      { municipalityName: "Leudal" },
      { municipalityName: "Maasgouw" },
      { municipalityName: "Maastricht" },
      { municipalityName: "Meerssen" },
      { municipalityName: "Mook en Middelaar" },
      { municipalityName: "Nederweert" },
      { municipalityName: "Peel en Maas" },
      { municipalityName: "Roerdalen" },
      { municipalityName: "Roermond" },
      { municipalityName: "Simpelveld" },
      { municipalityName: "Sittard-Geleen" },
      { municipalityName: "Stein" },
      { municipalityName: "Vaals" },
      { municipalityName: "Valkenburg aan de Geul" },
      { municipalityName: "Venlo" },
      { municipalityName: "Venray" },
      { municipalityName: "Voerendaal" },
      { municipalityName: "Weert" },
    ]);
    res.status(200).json({ success: true, msg: "All municipalities created" });
  } catch (error) {
    logError(error);
  }
};
