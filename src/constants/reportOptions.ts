export const REPORT_CATEGORIES = [
     'Pothole',
  'Broken Streetlight',
  'Damaged Sidewalk',
  'Graffiti',
  'Fallen Tree / Debris',
  'Flooding / Drainage',
  'Damaged Road Sign',
  'Illegal Dumping',
  'Other',
] as const;

export const REPORT_SEVERITIES = ['Low', 'Medium', 'High'] as const;


export type ReportCategory = typeof REPORT_CATEGORIES[number];
export type ReportSeverity = typeof REPORT_SEVERITIES[number];
 
// Human-readable descriptions shown on the create report screen
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Pothole':              'Road surface damage posing risk to vehicles',
  'Broken Streetlight':   'Non-functioning or damaged street lighting',
  'Damaged Sidewalk':     'Cracked, raised, or unsafe pedestrian path',
  'Graffiti':             'Vandalism on public property or infrastructure',
  'Fallen Tree / Debris': 'Obstruction on road, path, or public space',
  'Flooding / Drainage':  'Standing water or blocked storm drain',
  'Damaged Road Sign':    'Missing, bent, or unreadable traffic signage',
  'Illegal Dumping':      'Unauthorized waste left on public property',
  'Other':                'Any other municipal infrastructure concern',
};