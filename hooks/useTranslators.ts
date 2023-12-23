import { trpc } from "~/utils/trpc";

export const useTranslators = () => {
    const utils = trpc.useUtils();

    const { data, isLoading } = trpc.translator.list.useQuery();

    const { mutateAsync: deleteTranslatorAsync, isLoading: isDeletingTranslator } = trpc.translator.delete.useMutation({
        async onSuccess() {
            // refetches translator after a translator is deleted
            await utils.translator.list.invalidate();
        },
    });

    const { mutateAsync: addTranslatorAsync, isLoading: isAddingTranslator } = trpc.translator.add.useMutation({
        async onSuccess() {
            // refetches translator after a translator is added
            await utils.translator.list.invalidate();
        },
    });

    return {
        translators: data,
        isTranslatorsLoading: isLoading,
        isAddingTranslator,
        isDeletingTranslator,
        addTranslatorAsync,
        deleteTranslatorAsync,
    }
}