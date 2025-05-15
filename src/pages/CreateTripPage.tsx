
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { TripInfoForm } from "@/components/trip/TripInfoForm";
import { TripLocationForm } from "@/components/trip/TripLocationForm";
import { TripDateForm } from "@/components/trip/TripDateForm";
import { TripImageForm } from "@/components/trip/TripImageForm";
import { TripCreationSuccess } from "@/components/trip/TripCreationSuccess";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: 1, name: "Trip Info" },
  { id: 2, name: "Location" },
  { id: 3, name: "Dates" },
  { id: 4, name: "Cover Image" },
];

const CreateTripPage = () => {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    name: "",
    description: "",
    destination: "",
    location: { lat: 0, lng: 0 },
    startDate: null,
    endDate: null,
    budget: 0,
    coverImage: "",
    tripCode: "",
  });

  const updateTripData = (data: Partial<typeof tripData>) => {
    setTripData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (step < steps.length + 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Generate a unique trip code when reaching the success screen
  if (step === steps.length + 1 && !tripData.tripCode) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    updateTripData({ tripCode: result });
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <TripInfoForm tripData={tripData} updateTripData={updateTripData} onNext={nextStep} />;
      case 2:
        return <TripLocationForm tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <TripDateForm tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <TripImageForm tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <TripCreationSuccess tripData={tripData} />;
      default:
        return null;
    }
  };

  const progress = Math.min(((step - 1) / steps.length) * 100, 100);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Trip</h1>
        
        {step <= steps.length && (
          <div className="mb-8">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Step {step} of {steps.length}</span>
              <span className="font-medium">{steps[step - 1]?.name}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <div className="bg-card rounded-lg shadow-md p-6">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default CreateTripPage;
