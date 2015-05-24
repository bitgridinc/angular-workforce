declare var factories: {
    newBeaconFactory: () => {
        beacon: {
            title: string;
            description: string;
            lat: number;
            lng: number;
            streetAddress: string;
            numberOfPeople: string;
            responses: any[];
            acceptedAssistance: any[];
        };
        withIds: (id: any, senderId: any) => any;
        withSummaryText: (title: any, description: any) => any;
        withLocation: (latitude: any, longitude: any) => any;
        withAddress: (streetAddress: any) => any;
        withNumberOfPeople: (numberOfPeople: any) => any;
        withResponse: (response: any) => any;
        withAcceptedOffer: (acceptedOffer: any) => any;
        createBeacon: () => any;
    };
    newBeaconPostFactory: () => {
        beaconPost: {
            recipientIds: any[];
        };
        withSenderId: (senderId: any) => any;
        withSummaryText: (title: any, description: any) => any;
        withLocation: (latitude: any, longitude: any) => any;
        withAddress: (streetAddress: any) => any;
        withNumberOfPeople: (numberOfPeople: any) => any;
        withRecipientId: (recipientId: any) => any;
        withRecipientIds: (recipientIds: any) => any;
        createBeaconPost: () => any;
    };
    newAssistanceResponseFactory: () => {
        assistanceResponse: {};
        withIds: (id: any, senderId: any, beaconId: any) => any;
        withResponderCrew: (numResponders: any, arrivalDate: any) => any;
        createAssistanceResponse: () => any;
    };
};
export = factories;
