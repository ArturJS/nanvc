import { VaultCommandMetadata, VaultCommandValidationSchema } from './common';

export interface VaultCapabilitiesPayloadRequest {
    token: string,
    paths: Array<string>;
}

export const VaultCapabilitiesJsonSchema: VaultCommandValidationSchema = {
    req: {
        properties: {
            token: { type: 'string' },
            paths: {
                type: 'array',
                items: { type: 'string' },
            },
        },
        required: ['token', 'paths'],
    },
};

export const VaultCapabilitiesCommandMetadata: VaultCommandMetadata = {
    method: 'POST',
    path: '/sys/capabilities',
    acceptedCodes: [200],
};