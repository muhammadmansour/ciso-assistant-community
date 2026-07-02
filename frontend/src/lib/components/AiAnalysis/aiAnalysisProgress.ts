export type AnalysisStep = { label: string };

export const REQUIREMENT_ANALYSIS_STEPS: AnalysisStep[] = [
	{ label: 'Scanning attached documents and evidence...' },
	{ label: 'Analyzing compliance with AI...' },
	{ label: 'Preparing results and recommendations...' }
];

export const EVIDENCE_ANALYSIS_STEPS: AnalysisStep[] = [
	{ label: 'Loading evidence file and audit context...' },
	{ label: 'Analyzing against questions and typical evidence...' },
	{ label: 'Preparing compliance findings...' }
];

export const CONTROL_ANALYSIS_STEPS: AnalysisStep[] = [
	{ label: 'Collecting indexed evidence documents...' },
	{ label: 'Analyzing applied control with AI...' },
	{ label: 'Preparing control assessment results...' }
];

export type ProgressTimerState = {
	showProgressModal: boolean;
	analysisStep: number;
	analysisPercent: number;
	analysisComplete: boolean;
};

export function createProgressTimerCallbacks(
	getState: () => ProgressTimerState,
	setState: (patch: Partial<ProgressTimerState>) => void
) {
	let timer: ReturnType<typeof setInterval> | null = null;

	function startProgressTimer() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		setState({
			showProgressModal: true,
			analysisStep: 0,
			analysisPercent: 0,
			analysisComplete: false
		});

		timer = setInterval(() => {
			const s = getState();
			if (s.analysisComplete) return;

			let { analysisPercent, analysisStep } = s;
			if (analysisPercent < 30 && analysisStep === 0) {
				analysisPercent += 2;
			} else if (analysisPercent >= 30 && analysisStep < 1) {
				analysisStep = 1;
				analysisPercent += 1;
			} else if (analysisPercent >= 60 && analysisStep < 2) {
				analysisStep = 2;
				analysisPercent += 0.5;
			} else if (analysisPercent < 90) {
				analysisPercent += 0.3;
			}
			if (analysisPercent > 90) analysisPercent = 90;

			setState({ analysisPercent, analysisStep });
		}, 500);
	}

	function stopProgressTimer(success: boolean) {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		if (success) {
			setState({ analysisStep: 3, analysisPercent: 100, analysisComplete: true });
		} else {
			setState({ showProgressModal: false, analysisComplete: false });
		}
	}

	function closeProgressModal() {
		setState({ showProgressModal: false });
	}

	return { startProgressTimer, stopProgressTimer, closeProgressModal };
}
