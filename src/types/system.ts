export interface SystemInformation {
  success: boolean;
  data: {
    operatingSystem: {
      name: string;
      edition: string;
      version: string;
      buildNumber: string;
      architecture: string;
      kernelVersion: string;
      hostname: string;
    };

    processor: {
      manufacturer: string;
      model: string;
      cores: number;
      threads: number;
      clockSpeedGHz: number;
    };

    memory: {
      totalBytes: number;
      totalGB: number;
    };

    network: {
      hostname: string;
      macAddress: string;
    };

    identity: {
      serialNumber: string;
    };
  };
}
