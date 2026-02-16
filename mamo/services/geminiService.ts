
import { GoogleGenAI } from "@google/genai";

export const getRamadanTip = async () => {
  try {
    // Initialize GoogleGenAI using the process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'اعطني نصيحة قصيرة واحدة وملهمة لشهر رمضان، تركز على الروحانية أو الإنتاجية. بالعربية فقط.',
    });
    return response.text || "رمضان فرصة للتغيير نحو الأفضل.";
  } catch (error) {
    console.error("AI Error:", error);
    return "رمضان مبارك! اجعل هذا الشهر بداية لنجاحاتك.";
  }
};

export const chatWithAssistant = async (message: string) => {
  try {
    // Initialize GoogleGenAI using the process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: 'أنت مساعد رمضاني ذكي ومحفز. تساعد المستخدمين في تنظيم وقتهم، فهم القرآن، تقديم نصائح للدراسة والعمل أثناء الصيام، والإجابة على الأسئلة الدينية البسيطة بروح إيجابية. تحدث دائماً بالعربية الفصحى البسيطة.',
      }
    });
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "عذراً، أواجه مشكلة في الاتصال حالياً. حاول مرة أخرى لاحقاً.";
  }
};
