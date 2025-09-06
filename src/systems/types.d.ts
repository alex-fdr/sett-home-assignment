export type AssetsData = {
    models: ModelLoadData[],
    textures: TextureLoadData[],
}

export type TextureLoadData = {
    key: string;
    file: string;
};

export type ModelLoadData = {
    key: string;
    file: string;
};
