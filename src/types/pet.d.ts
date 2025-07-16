type PetPayload = {
  registNumber: string;
  birthday: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  weight: number;
  sex: boolean;
  isNeutered: boolean;
  image: string | null;
};

type PetFormValues = {
  registNumber: string;
  birthday: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  weight: number;
  sex: 'true' | 'false';
  isNeutered: 'true' | 'false';
  image: string | null;
};

type PetProfile = {
  registNumber: string;
  age: string;
  metday: string;
  name: string;
  breed: PetBreed;
  size: PetSize;
  sex: boolean;
  isNeutered: boolean;
  image: {
    petImgId: number;
    savePath: string;
    type: 'THUMBNAIL' | 'PROFILE' | 'GALLERY';
    originName: string;
    renamedName: string;
  };
};

type PetBreed =
  | 'BEAGLE'
  | 'BICHON_FRISE'
  | 'BORDER_COLLIE'
  | 'BOXER'
  | 'BULLDOG'
  | 'CHIHUAHUA'
  | 'COCKER_SPANIEL'
  | 'DACHSHUND'
  | 'DOBERMAN'
  | 'FRENCH_BULLDOG'
  | 'GERMAN_SHEPHERD'
  | 'GOLDEN_RETRIEVER'
  | 'GREAT_DANE'
  | 'HUSKY'
  | 'JACK_RUSSELL'
  | 'LABRADOR'
  | 'MALTESE'
  | 'PAPILLON'
  | 'POMERANIAN'
  | 'POODLE'
  | 'PUG'
  | 'SAMOYED'
  | 'SHIBA_INU'
  | 'SHIH_TZU'
  | 'WELSH_CORGI'
  | 'YORKSHIRE_TERRIER'
  | 'MIX';

type PetSize = 'SMALL' | 'MEDIUM' | 'LARGE';
