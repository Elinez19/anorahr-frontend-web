import React, { useState } from 'react';
import { X, Mail, Gift, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MarketingBannerProps {
  type: 'newsletter' | 'offer' | 'promotion';
  title: string;
  description: string;
  ctaText: string;
  onClose: () => void;
  onSubmit?: (email: string) => void;
  isVisible: boolean;
}

const MarketingBanner: React.FC<MarketingBannerProps> = ({
  type,
  title,
  description,
  ctaText,
  onClose,
  onSubmit,
  isVisible
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(email);
        setEmail('');
        onClose();
      } catch (error) {
        console.error('Error submitting:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'newsletter':
        return <Mail className="w-6 h-6" />;
      case 'offer':
        return <Gift className="w-6 h-6" />;
      case 'promotion':
        return <Star className="w-6 h-6" />;
      default:
        return <Mail className="w-6 h-6" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'newsletter':
        return 'bg-gradient-to-r from-mint-600 to-mint-700';
      case 'offer':
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'promotion':
        return 'bg-gradient-to-r from-purple-600 to-pink-600';
      default:
        return 'bg-gradient-to-r from-mint-600 to-mint-700';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className={`${getBgColor()} rounded-2xl shadow-2xl overflow-hidden`}>
              {/* Header */}
              <div className="relative p-6 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white bg-opacity-20 rounded-full">
                    {getIcon()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                  </div>
                </div>
                
                <p className="text-white text-opacity-90 mb-6">
                  {description}
                </p>

                {/* Newsletter Form */}
                {type === 'newsletter' && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-midnight-900"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || !email.trim()}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-midnight-900 font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        'Subscribing...'
                      ) : (
                        <>
                          {ctaText}
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Offer/Promotion CTA */}
                {type !== 'newsletter' && (
                  <div className="space-y-4">
                    <button
                      onClick={onClose}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-midnight-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {ctaText}
                      <ArrowRight size={16} />
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full px-6 py-2 text-white text-opacity-80 hover:text-white transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MarketingBanner; 