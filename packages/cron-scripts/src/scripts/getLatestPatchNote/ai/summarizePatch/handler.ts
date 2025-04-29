import { defaultTemperature, defaultModel as modelName } from '../../common/constants';
import { buildTemplate } from './prompt';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';

/**
 * Summarize a patch note.
 *
 * @param text The patch note to be summarized.
 * @returns The summarized patch note.
 */
export const summarizePatchHandler = async (text: string): Promise<string> => {
  const temperature = defaultTemperature;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
  }

  console.log('[summarizePatch] - API Key:', apiKey ? '***' : 'undefined');

  const model = new ChatOpenAI({
    modelName,
    temperature,
    frequencyPenalty: 0,
    presencePenalty: 0,
    apiKey,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', buildTemplate()],
    ['human', '{text}'],
  ]);

  const chain = RunnableSequence.from([prompt, model]);

  const result = await chain.invoke({ text });

  console.log('[summarizePatch] - Result:', result.text);

  return result.text;
};
